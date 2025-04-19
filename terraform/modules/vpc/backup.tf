# # Create a VPC
# resource "aws_vpc" "chatapp_vpc" {
#     cidr_block              = "10.0.0.0/16"
#     enable_dns_hostnames    = true
#     enable_dns_support      = true
#     tags = { Name = "chatapp-vpc" }
# }

# # Create Subnets
# ## Public subnet for backend
# resource "aws_subnet" "public_subnet_backend" {
#     cidr_block              = "10.0.1.0/24"
#     map_public_ip_on_launch = true
#     availability_zone       = "ap-southeast-1a"
#     vpc_id                  = aws_vpc.chatapp_vpc.id
#     tags = { Name = "public-subnet" }
# }

# ## Private subnets for DB
# resource "aws_subnet" "private_subnet_db_1" {
#     cidr_block              = "10.0.98.0/24"
#     map_public_ip_on_launch = false
#     availability_zone       = "ap-southeast-1c"
#     vpc_id                  = aws_vpc.chatapp_vpc.id
#     tags = { Name = "private-subnet-db-1" }
# }

# resource "aws_subnet" "private_subnet_db_2" {
#     cidr_block              = "10.0.99.0/24"
#     map_public_ip_on_launch = false
#     availability_zone       = "ap-southeast-1a"
#     vpc_id                  = aws_vpc.chatapp_vpc.id
#     tags = { Name = "private-subnet-db-2" }
# }

# # Create Security Groups
# ## Allow HTTP for Nginx
# resource "aws_security_group" "backend_sg" {
#     vpc_id = aws_vpc.chatapp_vpc.id
#     tags = {
#         Name = "backend-sg"
#     }

#     ingress {
#         from_port   = 80
#         to_port     = 80
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     ingress {
#         from_port   = 8080
#         to_port     = 8080
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     ingress {
#         from_port   = 6443
#         to_port     = 6443
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     ingress {
#         from_port   = 10250
#         to_port     = 10250
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     ingress {
#         from_port   = 443
#         to_port     = 443
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#     }

#     ingress {
#         from_port   = 22
#         to_port     = 22
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"] # Replace with your IP range for better security
#     }

#     egress {
#         from_port   = 0
#         to_port     = 0
#         protocol    = "-1"
#         cidr_blocks = ["0.0.0.0/0"]
#     }
# }

# ## Allow RDS only from backend
# resource "aws_security_group" "db_sg" {
#     vpc_id = aws_vpc.chatapp_vpc.id
#     tags = {
#         Name = "db-sg"
#     }

#     ingress {
#         from_port       = 3306
#         to_port         = 3306
#         protocol        = "tcp"
#         security_groups = [aws_security_group.backend_sg.id]
#     }
# }

# # Create Internet Gateway and NAT Gateway
# resource "aws_internet_gateway" "igw" {
#     vpc_id = aws_vpc.chatapp_vpc.id
#     tags = {
#         Name = "chatapp-igw"
#     }
# }

# resource "aws_nat_gateway" "nat" {
#     subnet_id       = aws_subnet.public_subnet_backend.id
#     allocation_id   = aws_eip.nat_eip.id
# }

# resource "aws_eip" "nat_eip" {
#     domain = "vpc"
# }

# # Create Route Tables
# ## Public route
# resource "aws_route_table" "public_rt" {
#     vpc_id = aws_vpc.chatapp_vpc.id
#     tags = {
#         Name = "public-rt"
#     }
# }
# resource "aws_route" "internet_access" {
#     route_table_id          = aws_route_table.public_rt.id
#     destination_cidr_block  = "0.0.0.0/0"
#     gateway_id              = aws_internet_gateway.igw.id
# }
# resource "aws_route_table_association" "public_assoc" {
#     subnet_id       = aws_subnet.public_subnet_backend.id
#     route_table_id  = aws_route_table.public_rt.id
# }

# ## Private route (via NAT)
# resource "aws_route_table" "private_rt" {
#     vpc_id = aws_vpc.chatapp_vpc.id
#     tags = {
#         Name = "private-rt"
#     }
# }
# resource "aws_route" "nat_access" {
#     route_table_id          = aws_route_table.private_rt.id
#     destination_cidr_block  = "0.0.0.0/0"
#     nat_gateway_id          = aws_nat_gateway.nat.id
# }
# resource "aws_route_table_association" "private_assoc_db_1" {
#     subnet_id       = aws_subnet.private_subnet_db_1.id
#     route_table_id  = aws_route_table.private_rt.id
# }
# resource "aws_route_table_association" "private_assoc_db_2" {
#     subnet_id       = aws_subnet.private_subnet_db_2.id
#     route_table_id  = aws_route_table.private_rt.id
# }