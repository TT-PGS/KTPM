variable "name" {
    description = "Name of the EC2 instance"
    type        = string
}

variable "ami" {
    description = "AMI ID for the EC2 instances"
    type        = string
}

variable "bootstrap_script" {
    type    = string
    default = ""
}

variable "bootstrap_script_file" {
    type    = string
    default = ""
}

variable "instance_type" {
    type    = string
    default = "t2.micro"
}

variable "keypair_name" {
    type    = string
    default = ""  
}

variable "subnet_id" {
    type    = string
    default = ""
}

variable "security_group_ids" {
    type    = list(string)
    default = []
}

variable "iam_instance_profile" {
    type    = string
    default = ""
}
