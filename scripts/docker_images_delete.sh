#!/bin/bash

# Delete all docker images
# shown with 'docker images'


echo "[*] Deleting docker images..."
docker image prune --all --force

# Check that deleting was successful:
if [ $? -eq 0 ]; then
    echo "[✔] Deleting docker imaages: Success."
else
    echo "[✘] Deleting docker images: Error. Try manual."
fi
