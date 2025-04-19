# Outputs for the VPC module
output "vpc_id" {
    value = aws_vpc.this.id
}

# Outputs for the public subnets
output "public_subnet_backend_ids" {
    value = aws_subnet.public_subnet_backend[*].id
}
output "private_subnet_group_name" {
    value = aws_db_subnet_group.private_subnet_group.name
}

# Outputs for security groups
output "backend_sg_id" {
    value = aws_security_group.backend_sg.id
}

output "db_sg_id" {
    value = aws_security_group.db_sg.id
}