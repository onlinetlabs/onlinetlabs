# Install Docker

```bash
# Add Docker repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Download and install docker
sudo apt update
sudo apt install docker-ce vim -y

# Check that Docker installed correctly
sudo systemctl status docker
# If not - got response:
# Unit docker.service could not be found.

# Add Docker to autostartup
sudo systemctl enable docker

# (Optional) add regular user to docker group to work with docker
# without root prev.
sudo groupadd docker
sudo usermod -aG docker ${USER}
newgrp docker       # No need to relogin.

# Test Docker
docker run hello-world

# Output example:
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
# ...
```

# Deploy docker containers

See docker-compose.yaml for example.
Also src/server/Dockerfile

# qwe
