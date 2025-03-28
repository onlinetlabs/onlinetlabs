#!/bin/bash

# The script intended to forcely stop docker compose build process
# if there any error occurs while building and docker wont exit.

# Kill 'docker compose build' processes
pkill -f "docker compose build"

# Kill '/usr/libexec/docker/cli-plugins/docker-compose compose build' process.
pgrep -f "/usr/libexec/docker/cli-plugins/docker-compose compose build" | xargs kill -9
