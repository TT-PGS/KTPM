output "ebsci_driver_policy_arn" {
    value = data.aws_iam_policy.EBSCSIDriverPolicy.arn
}

output "access_parameter_store_policy_arn" {
    value = aws_iam_policy.access_parameter_store_policy.arn
}

output "load_balancer_policy_arn" {
    value = aws_iam_policy.load_balancer_policy.arn
}