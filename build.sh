#!/bin/bash

source ./init.sh

echo "Building image ${IMAGE}..."
docker build \
    --build-arg USER=node \
    --build-arg USER_UID=1000 \
    --build-arg USER_GID=1000 \
    --target build -t ${IMAGE} . \
|| {
  echo "Build failed"
  exit 1
}

echo "Saving image to file..."
mkdir -p build
docker save -o ${IMAGE}.tar ${IMAGE} || {
  echo "Image save failed"
  exit 1
}

echo "Build completed successfully"