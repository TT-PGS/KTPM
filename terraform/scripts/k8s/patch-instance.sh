#!/bin/bash

EXPECTED_WORKER_COUNT=${number_of_workers}   # 🛠️ Set this to match your Terraform variable: var.number_of_workers
REGION=${region}

echo "Waiting for $EXPECTED_WORKER_COUNT worker nodes to join the cluster..."

while true; do
    # Count all nodes that are NOT the master and are Ready
    READY_NODES=$(kubectl get nodes \
        --no-headers \
        | grep -v master \
        | grep ' Ready' \
        | wc -l)

    if [ "$READY_NODES" -ge "$EXPECTED_WORKER_COUNT" ]; then
        echo "All $READY_NODES worker nodes are ready."
        break
    else
        echo "Currently $READY_NODES/$EXPECTED_WORKER_COUNT nodes are Ready. Waiting..."
        sleep 10
    fi
done

echo "Patching worker nodes with providerID..."

for node in $(kubectl get nodes -o name | grep -v master); do
    INTERNAL_IP=$(kubectl get $node -o jsonpath='{.status.addresses[?(@.type=="InternalIP")].address}')
    INSTANCE_ID=$(aws ec2 describe-instances \
        --filters "Name=private-ip-address,Values=$INTERNAL_IP" \
        --region $REGION \
        --query "Reservations[].Instances[].InstanceId" \
        --output text)

    echo "Patching $node with instance ID $INSTANCE_ID"
    kubectl patch $node -p "{\"spec\":{\"providerID\":\"aws:///$REGION/$INSTANCE_ID\"}}"
done
