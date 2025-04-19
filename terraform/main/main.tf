provider "aws" {
    region = var.aws_region
}

module "vpc" {
    source = "../modules/vpc"
    vpc_name = "${var.prefix}_vpc"
    vpc_cidr = var.vpc_cidr
    availability_zones = var.availability_zones
}

# Create K8s cluster

## Create IAM Role for K8s Nodes
resource "aws_iam_role" "k8s-node-role" {
    name = "${var.prefix}_k8s_node_role"
    # Terraform's "jsonencode" function converts a
    # Terraform expression result to valid JSON syntax.
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = "sts:AssumeRole"
                Effect = "Allow"
                Sid    = ""
                Principal = {
                    Service = "ec2.amazonaws.com"
                }
            },
        ]
    })
    
    tags = {
        Name = "k8s-node-role"
    }
}

module "policies" {
    prefix = var.prefix
    source = "../modules/policy"
}

resource "aws_iam_role_policy_attachment" "EBSCSIDriver-policy-attach" {
    role = aws_iam_role.k8s-node-role.name
    policy_arn = module.policies.ebsci_driver_policy_arn
}

resource "aws_iam_role_policy_attachment" "access_parameter_store_policy_attach" {
    role       = aws_iam_role.k8s-node-role.name
    policy_arn = module.policies.access_parameter_store_policy_arn
}

resource "aws_iam_role_policy_attachment" "load_balancer_policy_attach" {
    role       = aws_iam_role.k8s-node-role.name
    policy_arn = module.policies.load_balancer_policy_arn
}

resource "aws_iam_instance_profile" "k8s_node_profile" {
    name = "${var.prefix}_k8s_node_profile"
    role = aws_iam_role.k8s-node-role.name
}

## Create K8s Master Node
module "control_plane" {
    source              = "../modules/ec2"
    name                = "${var.prefix}_${var.master_instance_name}"
    ami                 = var.ami
    instance_type       = var.master_instance_type
    keypair_name        = var.keypair_name
    bootstrap_script    = templatefile(
        "../scripts/templatescript.tftpl",
        {
            script_list : [
                templatefile("../scripts/k8s/install-core-components.sh", {}),
                templatefile("../scripts/install-platform-apps/install-load-balancer-controller.sh", {}),
                templatefile("../scripts/k8s/init-cluster.sh", {}),
                templatefile("../scripts/k8s/configure-kubectl.sh", {}),
                templatefile("../scripts/k8s/patch-instance.sh", {
                    number_of_workers = var.number_of_workers
                    region = var.aws_region
                }),
                contains(var.included_components, "haproxy") ? templatefile("../scripts/haproxy/install-haproxy.sh", {}) : "",
                contains(var.included_components, "argocd") ? templatefile("../scripts/install-platform-apps/install-argocd.sh", {}) : "",
                contains(var.included_components, "ingress-controller") ? templatefile("../scripts/install-platform-apps/install-ingress-controller.sh", {}) : "",
                contains(var.included_components, "ebs-storageclass") ? templatefile("../scripts/install-platform-apps/install-ebs-storageclass.sh", {}) : "",
                contains(var.included_components, "platform-app") ? templatefile("../scripts/install-platform-apps/install-apps-via-argocd.sh", {}) : "",
            ]
        }
    )
    iam_instance_profile = aws_iam_instance_profile.k8s_node_profile.name
    subnet_id           = module.vpc.public_subnet_backend_ids[0]
    security_group_ids  = [module.vpc.backend_sg_id]
}

## Create K8s Worker Nodes
module "worker_nodes" {
    source              = "../modules/ec2"
    count               = var.number_of_workers
    name                = "${var.prefix}_${var.worker_instance_name}-${count.index}"
    ami                 = var.ami
    instance_type       = var.worker_instance_type
    keypair_name        = var.keypair_name
    bootstrap_script    = templatefile(
        "../scripts/templatescript.tftpl",
        {
            script_list : [
                templatefile("../scripts/k8s/install-core-components.sh", {}),
                templatefile("../scripts/k8s/join-cluster.sh", {}),
            ]
        }
    )
    iam_instance_profile = aws_iam_instance_profile.k8s_node_profile.name
    subnet_id           = element(module.vpc.public_subnet_backend_ids, count.index % length(module.vpc.public_subnet_backend_ids))
    security_group_ids  = [module.vpc.backend_sg_id]
}

# Create RDS Instance
module "auth_db" {
    source = "../modules/rds"
    db_identifier = "${var.prefix}-authen-db"
    db_allocated_storage = var.db_allocated_storage
    db_instance_class = var.db_instance_class
    db_engine = var.db_engine
    db_engine_version = var.db_engine_version
    db_name = "authen_db"
    db_username = var.db_username
    db_password = var.db_password
    db_subnet_group_name = module.vpc.private_subnet_group_name
    vpc_security_group_ids = [module.vpc.db_sg_id]
}

# module "conversation_db" {
#     source = "../modules/rds"
#     db_identifier = "${var.prefix}-conversation-db"
#     db_allocated_storage = var.db_allocated_storage
#     db_instance_class = var.db_instance_class
#     db_engine = var.db_engine
#     db_engine_version = var.db_engine_version
#     db_name = "conversation_db"
#     db_username = var.db_username
#     db_password = var.db_password
#     db_subnet_group_name = module.vpc.private_subnet_group_name
#     vpc_security_group_ids = [module.vpc.db_sg_id]
# }

# module "message_db" {
#     source = "../modules/rds"
#     db_identifier = "${var.prefix}-message-db"
#     db_allocated_storage = var.db_allocated_storage
#     db_instance_class = var.db_instance_class
#     db_engine = var.db_engine
#     db_engine_version = var.db_engine_version
#     db_name = "message_db"
#     db_username = var.db_username
#     db_password = var.db_password
#     db_subnet_group_name = module.vpc.private_subnet_group_name
#     vpc_security_group_ids = [module.vpc.db_sg_id]
# }

# module "react_db" {
#     source = "../modules/rds"
#     db_identifier = "${var.prefix}-react-db"
#     db_allocated_storage = var.db_allocated_storage
#     db_instance_class = var.db_instance_class
#     db_engine = var.db_engine
#     db_engine_version = var.db_engine_version
#     db_name = "react_db"
#     db_username = var.db_username
#     db_password = var.db_password
#     db_subnet_group_name = module.vpc.private_subnet_group_name
#     vpc_security_group_ids = [module.vpc.db_sg_id]
# }

# module "statistics_db" {
#     source = "../modules/rds"
#     db_identifier = "${var.prefix}-statistics-db"
#     db_allocated_storage = var.db_allocated_storage
#     db_instance_class = var.db_instance_class
#     db_engine = var.db_engine
#     db_engine_version = var.db_engine_version
#     db_name = "statistics_db"
#     db_username = var.db_username
#     db_password = var.db_password
#     db_subnet_group_name = module.vpc.private_subnet_group_name
#     vpc_security_group_ids = [module.vpc.db_sg_id]
# }

# module "logs_db" {
#     source = "../modules/rds"
#     db_identifier = "${var.prefix}-logs-db"
#     db_allocated_storage = var.db_allocated_storage
#     db_instance_class = var.db_instance_class
#     db_engine = var.db_engine
#     db_engine_version = var.db_engine_version
#     db_name = "logs_db"
#     db_username = var.db_username
#     db_password = var.db_password
#     db_subnet_group_name = module.vpc.private_subnet_group_name
#     vpc_security_group_ids = [module.vpc.db_sg_id]
# }

# # Create Ingress Controller
# module "nginx_ingress" {
#   source        = "../modules/nginx-ingress"
#   namespace     = "ingress-nginx"
#   chart_version = "4.10.1"
# }
