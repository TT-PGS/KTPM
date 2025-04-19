resource "aws_db_instance" "this" {
    identifier              = var.db_identifier
    allocated_storage       = var.db_allocated_storage
    engine                  = var.db_engine
    engine_version          = var.db_engine_version
    instance_class          = var.db_instance_class
    db_name                 = var.db_name
    username                = var.db_username
    password                = var.db_password
    vpc_security_group_ids  = var.vpc_security_group_ids
    db_subnet_group_name    = var.db_subnet_group_name
    skip_final_snapshot     = true
    publicly_accessible     = false
    multi_az                = false 
}