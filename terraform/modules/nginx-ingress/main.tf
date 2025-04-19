provider "helm" {
    kubernetes {
        config_path = "~/.kube/config"
    }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}


resource "kubernetes_namespace" "ingress" {

    metadata {
        name = var.namespace
    }
}

resource "helm_release" "nginx_ingress" {
    name       = "ingress-nginx"
    repository = "https://kubernetes.github.io/ingress-nginx"
    chart      = "ingress-nginx"
    version    = var.chart_version
    namespace  = var.namespace
    
    values = [
        yamlencode({
            controller = {
                replicaCount = 2
                service = {
                type = "LoadBalancer"
                annotations = {
                    "service.beta.kubernetes.io/aws-load-balancer-type" = "nlb" # Or "elb" if not using NLB
                }
                }
            }
        })
    ]

    depends_on = [kubernetes_namespace.ingress]
}
