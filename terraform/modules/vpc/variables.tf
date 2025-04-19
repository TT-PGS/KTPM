variable "vpc_name" {
#   default = "nalo-vpc"
    description = "Name of the VPC"
    type        = string
}

variable "vpc_cidr" {
#   default = "10.0.0.0/16"
    description = "CIDR block for the VPC"
    type        = string
}

variable "availability_zones" {
    description = "List of availability zones"
    type        = list(string)
}