# 1. The container uses the alpine Linux distribution version 3.20.3
# as a base image. Alpine is a minimal and lightweight image
# primarily used for small and efficient containers.
FROM alpine:3.20.3

# 2. Add start.sh, config.ini, requirements.txt and dependencies.json files
# to specific locations inside the container filesystem.
# (Install the magic wrapper)
ADD ./start.sh /start.sh
ADD ./config.ini /config.ini
ADD ./requirements.txt /requirements.txt
ADD ./dependencies.json /tmp/dependencies.json

# 3. Install dependencies
# Creates a directory /data to hold persistent data for the container:
RUN mkdir /data
# Install necessary build dependencies (e.g., jq, gcc, python3-dev, etc.)
# using apk add:
RUN apk add --no-cache --virtual=build-dependencies jq gcc python3-dev musl-dev linux-headers
# Parse dependencies.json with jq to extract key-value pairs (packages)
# and installs these additional dependencies:
# Docker is optional, some nodes are based on Docker.
RUN jq -r 'to_entries | .[] | .key + "=" + .value' /tmp/dependencies.json | xargs apk add --no-cache
# Install Python packages listed in requirements.txt using pip:
RUN pip install -r /requirements.txt --break-system-packages
# Clean up by removing build dependencies to keep the image lightweight:
RUN apk del --purge build-dependencies
# Install bash command
RUN apk add --no-cache bash

# Define the default command to run when the container starts: start.sh:
CMD [ "/start.sh" ]

# workaround for https://github.com/GNS3/gns3-server/issues/2367
# Create a symbolic link (ln -s) pointing /bin/busybox to a specific
# directory used by the gns3server package:
RUN ln -s /bin/busybox /usr/lib/python*/site-packages/gns3server/compute/docker/resources/bin

# Set /data as the working directory where subsequent commands
# will be executed.
WORKDIR /data

# Mark /data as a volume. Any data stored in this directory will
# persist even after the container is stopped, making it ideal
# for storing application data.
VOLUME ["/data"]
