variable "db_identifier" {
    description = "RDS database identifier"
    type        = string
}

variable "db_instance_class" {
    description = "RDS instance class"
    type        = string
}

variable "db_engine" {
    description = "RDS engine"
    type        = string
}

variable "db_engine_version" {
    description = "RDS engine version"
    type        = string
}

variable "db_allocated_storage" {
    description = "RDS allocated storage in GB"
    type        = number
    default     = 20
}

variable "db_name" {
    description = "RDS database name"
    type        = string
}

variable "db_username" {
    description = "RDS master username"
    type        = string
}

variable "db_password" {
    description = "RDS master password"
    type        = string
    sensitive   = true
}

variable "db_subnet_group_name" {
    description = "Name of the DB subnet group"
    type        = string
}

variable "vpc_security_group_ids" {
    description = "List of VPC security group IDs"
    type        = list(string)
}