locals {
    vpc_name = var.vpc_name
    vpc_cidr = var.vpc_cidr
    availability_zones = var.availability_zones
    public_subnet_count = 2
    private_db_subnet_count = 2
}

# Create a VPC
resource "aws_vpc" "this" {
    cidr_block              = var.vpc_cidr
    enable_dns_hostnames    = true
    enable_dns_support      = true
    tags = {
        Name = var.vpc_name
    }
}

# Create Subnets
## Public subnet for backend
resource "aws_subnet" "public_subnet_backend" {
    vpc_id                 = aws_vpc.this.id
    count                  = local.public_subnet_count
    cidr_block             = cidrsubnet(aws_vpc.this.cidr_block, 8, count.index)
    availability_zone      = element(var.availability_zones, count.index)
    map_public_ip_on_launch = true
    tags = {
        Name = "${var.vpc_name}-public-subnet",
        "kubernetes.io/cluster/kubernetes" = "shared",
        "kubernetes.io/role/elb" = "1"
    }
}

## Private subnets for DB
resource "aws_subnet" "private_subnet_db" {
    vpc_id                 = aws_vpc.this.id
    count                  = local.private_db_subnet_count
    cidr_block             = cidrsubnet(aws_vpc.this.cidr_block, 8, 100+count.index)
    availability_zone      = element(var.availability_zones, count.index)
    map_public_ip_on_launch = false
    tags = {
        Name = "${var.vpc_name}-private-subnet-db-${count.index + 1}"
    }
}

resource "aws_db_subnet_group" "private_subnet_group" {
    subnet_ids = aws_subnet.private_subnet_db[*].id
    tags = {
        Name = "${var.vpc_name}-db-subnet-group"
    }
}

# Create Security Groups
## Allow HTTP for Nginx
resource "aws_security_group" "backend_sg" {
    vpc_id = aws_vpc.this.id
    tags = {
        Name = "${var.vpc_name}-backend-sg"
    }

    ingress {
        from_port   = 80
        to_port     = 80
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 443
        to_port     = 443
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"] # Replace with your IP range for better security
    }

    ingress {
        from_port   = 8080
        to_port     = 8080
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 6443
        to_port     = 6443
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 2379
        to_port   = 2380
        protocol  = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 10250
        to_port     = 10250
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 10257
        to_port     = 10257
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 10259
        to_port     = 10259
        protocol    = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 30000
        to_port   = 32767
        protocol  = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 6783
        to_port   = 6784
        protocol  = "TCP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 6783
        to_port   = 6784
        protocol  = "UDP"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        cidr_blocks     = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

## Allow RDS only from backend
resource "aws_security_group" "db_sg" {
    vpc_id = aws_vpc.this.id
    tags = {
        Name = "${var.vpc_name}-db-sg"
    }

    ingress {
        from_port       = 3306
        to_port         = 3306
        protocol        = "TCP"
        security_groups = [aws_security_group.backend_sg.id]
    }

    ingress {
        from_port       = 3306
        to_port         = 3306
        protocol        = "TCP"
        cidr_blocks     = ["192.168.0.0/16"]
    }

    ingress {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        cidr_blocks     = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# Create Internet Gateway and NAT Gateway

resource "aws_eip" "nat_eip" {
    domain = "vpc"
    tags = {
        Name = "${var.vpc_name}-nat-eip"
    }
}

resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.this.id
    tags = {
        Name = "${var.vpc_name}-chatapp-igw"
    }
}

resource "aws_nat_gateway" "nat" {
    subnet_id       = aws_subnet.public_subnet_backend[0].id
    allocation_id   = aws_eip.nat_eip.id
    tags = {
        Name = "${var.vpc_name}-nat-gateway"
    }
}

# Create Route Tables
## Public route
resource "aws_route_table" "public_rt" {
    vpc_id = aws_vpc.this.id
    tags = {
        Name = "${var.vpc_name}-public-rt"
    }
}
resource "aws_route" "internet_access" {
    route_table_id          = aws_route_table.public_rt.id
    destination_cidr_block  = "0.0.0.0/0"
    gateway_id              = aws_internet_gateway.igw.id
}
resource "aws_route_table_association" "public_assoc" {
    count           = local.public_subnet_count
    subnet_id       = aws_subnet.public_subnet_backend[count.index].id
    route_table_id  = aws_route_table.public_rt.id
}

## Private route (via NAT)
resource "aws_route_table" "private_rt" {
    vpc_id = aws_vpc.this.id
    tags = {
        Name = "${var.vpc_name}-private-rt"
    }
}
resource "aws_route" "nat_access" {
    route_table_id         = aws_route_table.private_rt.id
    destination_cidr_block = "0.0.0.0/0"
    nat_gateway_id         = aws_nat_gateway.nat.id
}
resource "aws_route_table_association" "private_assoc_db" {
    count           = local.private_db_subnet_count
    subnet_id       = aws_subnet.private_subnet_db[count.index].id
    route_table_id  = aws_route_table.private_rt.id
}