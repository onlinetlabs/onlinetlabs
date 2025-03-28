#!/bin/bash

# Stop and remove containers defined in the docker-compose.yaml and images.
# Should be run from the root of the project.


echo "[*] Stopping and deleting service and image..."
docker compose down --rmi all -t 2
if [ $? -ne 0 ]; then
    echo "[✘] ERROR: Deleting service. Exiting."
    exit
fi


echo "[*] Removing unused data..."
docker system prune --volumes -af && docker image prune -af
if [ $? -ne 0 ]; then
    echo "[✘] ERROR: Removing unused data.. Exiting."
    exit
fi


echo "[✔] Deleting service: Success."
