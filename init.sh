

if command -v docker &> /dev/null; then
    docker --version
else  
    echo "Docker is not installed"
    exit 1
fi

if docker compose version &> /dev/null; then
  docker compose version
else
    echo "Docker Compose V2 is not installed"
    exit 1
fi

export APP=w34e8yr

# export USER=$(whoami)
export USER=node
export USER_HOME=/home/$USER/

export IMAGE=$APP

export PWD=$PWD

export COMPOSE_MENU=0

echo ""
