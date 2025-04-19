data "aws_iam_policy" "EBSCSIDriverPolicy" {
    arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
}