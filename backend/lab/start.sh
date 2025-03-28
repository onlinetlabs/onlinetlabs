#!/bin/sh


"The start.sh script is a shell script used for setting up
a network bridge and configuring a local Docker and GNS3 environment."


# Copy projects folder that contains labs to the /data volume:
# But first it should be transfered to the / via Dockerfile.
mv /projects /data/projects
mv /install_devices.py /data/install_devices.py

mv /devices /data/devices
mv /unzip_devices.sh /data/unzip_devices.sh
cd /data
./unzip_devices.sh



# Check if the CONFIG variable is set; if not, it assigns
# it a default value of /data/config.ini.
if [ "${CONFIG}x" == "x" ]; then
	CONFIG=/data/config.ini
fi

# If the configuration file does not exist at the specified location,
# it copies a template configuration file from /config.ini to /data.
if [ ! -e $CONFIG ]; then
	cp /config.ini /data
fi

# Create a Network Bridge:
# A virtual bridge named virbr0 is created,
# and the bridge interface is brought up.
brctl addbr virbr0
ip link set dev virbr0 up

# Configure Bridge Address:
# Check if the BRIDGE_ADDRESS variable is set; if not, it
# assigns a default IP address of 172.21.1.1/24 to the bridge.
if [ "${BRIDGE_ADDRESS}x" == "x" ]; then
  BRIDGE_ADDRESS=172.21.1.1/24
fi
ip ad add ${BRIDGE_ADDRESS} dev virbr0

# Set Up NAT with iptables:
# Configure NAT (Network Address Translation) so that traffic
# from the virtual bridge can access the outside network
# through the eth0 interface.
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Configure DHCP with dnsmasq:
# Set up a DHCP server on the virbr0 interface which provides IP addresses
# in the range 172.21.1.10 to 172.21.1.250 for clients connecting to
# that network.
dnsmasq -i virbr0 -z -h --dhcp-range=172.21.1.10,172.21.1.250,4h

# Run Docker and GNS3 Server:
# Start the Docker daemon with specific storage settings
# and runs the GNS3 server using the configuration file specified by CONFIG.
dockerd --storage-driver=vfs --data-root=/data/docker/ &

# Install additional devices
python3 install_devices.py &
gns3server -A --config $CONFIG
