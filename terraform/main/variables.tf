# This file contains the variables used in the Terraform configuration.

# Variables for naming
variable "prefix" {
    description = "Prefix for all resources"
    type        = string
}

variable "aws_region" {
    description = "AWS region"
    type        = string
    default     = "ap-southeast-1"
}

variable "availability_zones" {
    description = "List of availability zones"
    type        = list(string)
}

# Variables for VPC
variable "vpc_cidr" {
    description = "VPC CIDR block"
}

# Variables for K8s
variable "keypair_name" {
    description = "Key pair name for SSH access"
    type        = string
}

variable "master_instance_type" {
    description = "Instance type for the master node"
    type        = string
    default     = "t3.medium"
}

variable "worker_instance_type" {
    description = "Instance type for the worker nodes"
    type        = string
    default     = "t3.medium"
}

variable "ami" {
    description = "AMI ID for the nodes"
    type        = string
}

variable "master_instance_name" {
    description = "Name for the master node"
    type        = string
    default     = "k8s-master"
}

variable "worker_instance_name" {
    description = "Name for the worker nodes"
    type        = string
    default     = "k8s-worker"
}

variable "number_of_workers" {
    description = "Number of worker nodes"
    type        = number
    default     = 2
}

variable "worker_disk_size" {
    description = "Disk size for the worker nodes in GB"
    type        = number
    default     = 20
}

variable "included_components" {
    description = "List of components to include in the installation"
    type        = list(string)
    default     = ["haproxy", "ebs-storageclass"]
}

# Variables for RDS
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

variable "db_username" {
    description = "RDS master username"
    type        = string
}

variable "db_password" {
    description = "RDS master password"
    type        = string
    sensitive   = true
}