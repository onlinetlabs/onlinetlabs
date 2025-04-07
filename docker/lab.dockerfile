# Use a multi-stage build to keep the final image clean
FROM alpine:3.21.0 as builder

# Copy all necessary files
COPY start.sh /start.sh
COPY unzip_devices.sh /unzip_devices.sh
COPY config.ini /config.ini
COPY requirements.txt /requirements.txt
COPY dependencies.json /tmp/dependencies.json
COPY install_devices.py /install_devices.py
COPY devices /devices
COPY projects /projects

# Install build dependencies including dos2unix for line ending conversion
RUN apk add --no-cache --virtual=build-dependencies \
    jq \
    gcc \
    python3-dev \
    musl-dev \
    linux-headers \
    dos2unix

# Convert Windows line endings to UNIX and make scripts executable
RUN dos2unix /start.sh /unzip_devices.sh && \
    chmod +x /start.sh /unzip_devices.sh

# Install runtime dependencies from JSON config
RUN jq -r 'to_entries | .[] | .key + "=" + .value' /tmp/dependencies.json | xargs apk add --no-cache

# Install Python dependencies
RUN pip install -r /requirements.txt --break-system-packages

# Cleanup build dependencies
RUN apk del --purge build-dependencies


# Final stage
FROM alpine:3.21.0

# Copy installed dependencies from builder
COPY --from=builder / /

# Install runtime requirements
RUN apk add --no-cache bash python3

# GNS3 workaround for busybox symlink
RUN ln -s /bin/busybox /usr/lib/python*/site-packages/gns3server/compute/docker/resources/bin

# Set working directory and volume
WORKDIR /data
VOLUME ["/data"]

# Entrypoint configuration
CMD ["/start.sh"]