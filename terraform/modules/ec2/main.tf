resource "aws_instance" "this" {
    ami                     = var.ami  # Ubuntu
    instance_type           = var.instance_type
    subnet_id               = var.subnet_id
    vpc_security_group_ids  = var.security_group_ids
    key_name                = var.keypair_name
    iam_instance_profile    = var.iam_instance_profile
    user_data               = var.bootstrap_script
    tags = {
        Name = "${var.name}",
        "kubernetes.io/cluster/kubernetes" = "owned",
        "kubernetes.io/role/elb" = "1"
    }
}
