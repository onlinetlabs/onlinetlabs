# -------------- #
# System imports #

import asyncio
from abc                import abstractmethod
from telnetlib          import Telnet
# from asyncio_telnet import Telnet

# ------------------- #
# Third party imports #

import requests


# ------------- #
# Local imports #

from utils.datastructures   import logger


# CONSTANTS #

############
#  CLASSES #
############

class CheckerInterface:
    """
    Contains most used functions like:
    - project_nodes_start
    - project_nodes_stop
    - project_nodes_get
    - project_noeds_ping
    """

    def __init__(self,
            lab_host:str,
            lab_port:int,
            ) -> None:
        
        self.lab_host = lab_host
        self.lab_port = lab_port

        self.TIMEOUT = 2    # sec


    @abstractmethod
    async def lab_perform_check(
            self,
            token:str,
            project_id:str,
            ) -> tuple[bool, list[str]]:
        ...


    async def telnet_buffer_flush(self, tn:Telnet) -> None:
        """
        """
        
         # Sort of buffer flush
        while True:
            count = 0
            _ = tn.read_until(b"\r\n", timeout=0.1)
            logger.core.debug(f"Flushing tn buf:\n{_}")
            if _ == b"":
                break
            await asyncio.sleep(0.1)
            count += 1
            if count > 10:
                break


    async def project_open(
            self,
            token:str,
            project_id:str,
            ) -> bool:
        """
        Before starting nodes need to open project.
        Or get error: 403 Need to open project.
        """

        url = f"http://{self.lab_host}:{self.lab_port}/v3/projects/{project_id}/open"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
        data = {
        }

        response = requests.post(url, headers=headers, json=data)
    
        if response.ok:
            return True
        else:
            logger.core.debug("Error could not stop the nodes:", response.status_code, response.text)
            return False


    async def project_nodes_ping(self,
            device_src:dict,
            device_dst_ip:str,
            ) -> bool:
        """
        Conduct ping command between two devices.

        : token     Restapi token to communicate with gns3server,
        : project_id        Project to start nodes,
        : device_src   The device that executes the ping command,
        : device_dst   The device that will be pinged

        """

        src_port    = device_src['console']
        dst_ip      = device_dst_ip

        # tn = telnetlib.Telnet(self.lab_host, src_port)
        tn = Telnet(self.lab_host, src_port)
        # Sort of buffer flush
        tn.write(b"\x03")   # Ctrl+C to interrupt
        await self.telnet_buffer_flush(tn)
        await asyncio.sleep(0.5)

        tn.write(bytes(f"ping {dst_ip}\r\n", "utf-8"))

        #TODO: perform ping and check for errors
        while True:
            count = 0
            response = tn.read_until(b"\r\n", timeout=1.5)
            logger.core.debug(f"[DEBUG] Responce from ping:\n{response}")
            # b'84 bytes from 192.168.1.2 icmp_seq=5 ttl=64 time=0.337 ms\r\n'
            if b'84 bytes from' in response:
                tn.write(b"\x03")   # Ctrl+C to interrupt
                tn.close()
                return True
            # b'host (192.168.1.3) not reachable\r\n'
            elif b'not reachable' in response:
                tn.write(b"\x03")
                tn.close()
                return False
            elif b'unreachable' in response:
                tn.write(b"\x03")   # Ctrl+C to interrupt
                tn.close()
                return False
            elif b'' in response:
                count += 1
                if count > 3:
                    tn.write(b"\x03")   # Ctrl+C to interrupt
                    tn.close()
                    return False
        

    async def project_nodes_get(self,
            token:str, project_id:str,
            ) -> list[dict]|None:
        """
        Retreive all nodes and their params of the given project.

        :token      Restapi token to communicate with gns3server,
        :project_id Project to start nodes,

        """

        url = f"http://{self.lab_host}:{self.lab_port}/v3/projects/{project_id}/nodes"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
        data = {
        }

        response = requests.get(url, headers=headers, json=data)
    
        if response.status_code == 200:
            logger.core.debug(f"[DEBUG] Project nodes num: {len(response.json())}")
            return response.json()
        else:
            logger.core.debug("Error:", response.status_code, response.text)
            return None

    
    async def project_nodes_get_node_by_name(self,
            node_name:str,
            nodes:list[dict],
            ) -> dict|None:
        """
        Get specific node dict obj by its name.
        """
        
        for node in nodes:
            if node_name == node["name"]:
                return node
        return None


    async def project_nodes_start(self,
            token:str, project_id:str) -> bool:
        """
        Starts all nodes of the given project.

        :token      Restapi token to communicate with gns3server,
        :project_id Project to start nodes,

        """

        url = f"http://{self.lab_host}:{self.lab_port}/v3/projects/{project_id}/nodes/start"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
        data = {
        }

        response = requests.post(url, headers=headers, json=data)
    
        if response.ok:
            logger.core.debug(f"[DEBUG] Project nodes successfully started.")
            return True
        else:
            logger.core.debug("Error could not start the nodes:", response.status_code, response.text)
            return False


    async def project_nodes_stop(self,
            token:str, project_id:str) -> bool:
        """
        Stop all nodes of the given project.

        :token      Restapi token to communicate with gns3server,
        :project_id Project to start nodes,

        """

        url = f"http://{self.lab_host}:{self.lab_port}/v3/projects/{project_id}/nodes/stop"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
        data = {
        }

        response = requests.post(url, headers=headers, json=data)
    
        if response.ok:
            logger.core.debug(f"[DEBUG] Found project nodes successfully stopped.")
            return True
        else:
            logger.core.debug("Error could not stop the nodes:", response.status_code, response.text)
            return False


    async def get_vpcs_ip(
            self,
            node:dict,
            ) -> str|None:
        """
        Execute 'show' via telnet and parse output.
        """

        port    = node['console']

        # tn = telnetlib.Telnet(self.lab_host, port)
        tn = Telnet(self.lab_host, port)
        # Sort of buffer flush
        tn.write(b"\x03")   # Ctrl+C to interrupt
        await self.telnet_buffer_flush(tn)

        tn.write(b"show\r\n")

        # First reading stop at PC1 or watever vpcs name
        _ = tn.read_until(bytes(node["name"], "utf-8"), timeout=0.3)
        # Then extract its IP
        response:str = tn.read_until(b"\r\n", timeout=0.3).decode()
        logger.core.debug(f"Getting node IP (not final): {response}")
        # Get rid of spaces
        response_refined = \
                [item for item in response.split(" ") if len(item) > 0 and item != ":"]
        try:
            node_ip = response_refined[0].split("/")[0]
        except IndexError as e:
            return None

        tn.write(b"\x03")   # Ctrl+C to interrupt
        tn.close()

        return node_ip
