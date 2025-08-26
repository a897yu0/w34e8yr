#!/bin/bash

DESTINATION=$1

source ./init.sh

# Check if DESTINATION is provided
if [ -z "$DESTINATION" ]; then
    echo "Error: Deployment destination not provided."
    echo "Usage: ./deploy.sh <destination>"
    echo "Example: ./deploy.sh user@host:/path/to/deploy"
    exit 1
fi

echo "Deploying to ${DESTINATION}..."

scp \
    ${IMAGE}.tar \
    .env.example \
    ${DESTINATION}

echo "Deploy completed successfully"