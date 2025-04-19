echo "#############################"
echo "init-cluster.sh"
#Update hostname before init cluster
sudo hostnamectl set-hostname "master"

#init cluster
sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --cri-socket=unix:///var/run/containerd/containerd.sock

#Update kubeconfig file to use kubectl
mkdir -p /home/ubuntu/.kube
sudo cp -i /etc/kubernetes/admin.conf /home/ubuntu/.kube/config
sudo chown -R ubuntu:ubuntu /home/ubuntu/.kube/

# Install calico CNI
echo "============Install Calico CNI ============"
max_attempts=60  # Total waiting time: 60 * 5 seconds = 5 minutes
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if kubectl --kubeconfig /home/ubuntu/.kube/config get nodes &> /dev/null; then
        echo "kubectl get nodes succeeded."
        kubectl --kubeconfig /home/ubuntu/.kube/config apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.2/manifests/calico.yaml        
        break
    else
        echo "attempt=$attempt: kubernetes cluster is not ready yet..."
        sleep 10
        ((attempt++))
    fi
done

# update k8s_join_command param
aws ssm put-parameter --name="join-cluster-command"  --type=String --value="sudo $(kubeadm token create --print-join-command)" --overwrite