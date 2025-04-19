variable "namespace" {
  type    = string
  default = "ingress-nginx"
}

variable "chart_version" {
  type    = string
  default = "4.10.1" # You can check latest on ArtifactHub
}
variable "aws_region" {
  type    = string
  default = "ap-southeast-1"
}
variable "availability_zones" {
  type    = list(string)
  default = ["ap-southeast-1a", "ap-southeast-1b", "ap-southeast-1c"]
}