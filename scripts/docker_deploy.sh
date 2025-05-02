#!/bin/bash

# Removes old images (if any), build new images for the service and
# starts containers defined in the docker-compose.yaml.
# Should be run from the root of the project.

./scripts/docker_delete.sh


echo "[*] Building new service(s) image(s)..."
docker compose build
if [ $? -ne 0 ]; then
    echo "[✘] ERROR: Building new service(s) image(s). Exiting."
    exit
fi


echo "[*] Starting services' container(s)..."
docker compose up -d
if [ $? -ne 0 ]; then
    echo "[✘] ERROR: Starting services' container(s). Exiting."
    exit
fi

echo "[*] Remove all unused data..."
docker system prune -af
if [ $? -ne 0 ]; then
    echo "[✘] ERROR: Remove all unused data. Exiting."
    exit
fi

echo "[✔] Deploying services' containers: Success."
