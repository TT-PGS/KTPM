# Update hostname before join cluster
# privateip=$(curl http://169.254.169.254/latest/meta-data/local-ipv4)
# hostname=$(aws ssm get-parameter --name $privateip --output text --query "Parameter.Value")
# sudo hostnamectl set-hostname $hostname

while true 
do
    sleep 5
    result=$(aws ssm get-parameter --name "join-cluster-command" --output text --query "Parameter.Value")
    # Join cluster
    join_command=$(echo "$result" | sed -e "s/\\\\//g")
    sudo $join_command
    if [[ $? -eq 0 ]]; then
        echo "Cluster created. Successfully joined worker node to cluster."
        break
    else
        echo "Failed to join cluster. Retrying..."
    fi
done
