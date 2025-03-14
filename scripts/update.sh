echo "[*] Restoring local repo..."
git restore .
if [ $? -ne 0 ]; then
    echo "[✘] ERROR: Restoring local repo. Exiting."
    exit
fi


echo "[*] Updating local repo..."
git pull
if [ $? -ne 0 ]; then
    echo "[✘] ERROR: Updating local repo. Exiting."
    exit
fi

./scripts/docker_deploy.sh
