#!/bin/bash

source ./init.sh

docker compose --file docker-compose.yaml up -d --build --remove-orphans