# -------------- #
# System imports #

import asyncio
from uuid import UUID


# ------------------- #
# Third party imports #

# For gns3 project duplication
import requests
import json

from requests.models import HTTPError


# ------------- #
# Local imports #

from utils.labs_checker.CheckerInterface    import CheckerInterface






# --------- #
# CONSTANTS #


#############
#  CLASSES  #
#############

class Checker01(CheckerInterface):
    
    async def lab_perform_check(
            self,
            token:str,
            project_id:str,
            ) -> tuple[bool, list[str]]:
        """
        Algotithm to check the fiest lab: 'routing-in-ip-networks'.
        """
        
        checklog:list[str] = []
        passed:bool = False

        # OPEN PROJECT
        project_opened:bool = await self.project_open(
                token,
                project_id,
                )
        if not project_opened:
            checklog.append(f"Could not open project. Possible invalid project_id.")
            checklog.append(f"Project checking terminated.")
            return passed, checklog
        checklog.append(f"Successfully opened project.")


        # GET PROJECT's NODEs
        nodes:list[dict]|None = \
                await self.project_nodes_get(token, project_id)
        if nodes is None:
            checklog.append(f"Could not get any project node.")
            checklog.append(f"Project checking terminated.")
            return passed, checklog
        checklog.append(f"Successfully retreived ({len(nodes)}) nodes.")
        

        # RETREIVE KEY NODES
        key_nodes_names = [
                "PC1",
                "PC4",
                "PC5",
                ]
        key_nodes:list[dict] = []
        for node_name in key_nodes_names:
            node:dict|None = await self.project_nodes_get_node_by_name(
                    node_name, nodes)
            if node is None:
                checklog.append(f"Could not get node with name: '{node_name}'. Check node names or restart them.")
                checklog.append(f"Project checking terminated.")
                return passed, checklog
            key_nodes.append(node)
        if len(key_nodes) is None:
            checklog.append(f"Lab checking misconfigured. Address admin.")
            checklog.append(f"Project checking terminated.")
            return passed, checklog

        checklog.append(f"Key nodes successfully retreived.")


        # START ALL PROJECTS NODES

        nodes_started:bool = await self.project_nodes_start(
                token, project_id)
        if not nodes_started:
            checklog.append(f"Could not start project nodes. Address admin.")
            checklog.append(f"Project checking terminated.")
            return passed, checklog

        checklog.append(f"All project nodes started.")

        # GATHER VPCS IPs
        key_nodes_ip:list[str] = []
        for node in key_nodes:
            node_ip:str|None = await self.get_vpcs_ip(node)
            if node_ip is None:
                checklog.append(f"Could not get ip for {node['name']}")
                checklog.append(f"Try again or check node config.")
                checklog.append(f"Project checking terminated.")
                return passed, checklog
            key_nodes_ip.append(node_ip)


        # PERFORM PING BETWEEN KEY NODES
        checklog.append(f"Ping from {key_nodes[0]['name']} to {key_nodes_ip[1]}...")
        res_1:bool = await self.project_nodes_ping(
                key_nodes[0],
                key_nodes_ip[1],
                )
        checklog.append(f"Ping from {key_nodes[0]['name']} to {key_nodes_ip[2]}...")
        res_2:bool = await self.project_nodes_ping(
                key_nodes[0],
                key_nodes_ip[2],
                )
        checklog.append(f"Ping from {key_nodes[1]['name']} to {key_nodes_ip[2]}...")
        res_3:bool = await self.project_nodes_ping(
                key_nodes[1],
                key_nodes_ip[2],
                )

        if not res_1 or not res_2 or not res_3:
            checklog.append(f"Ping stage didnt complete fuccessfully.")
            checklog.append(f"{res_1} {res_2} {res_3}")
            checklog.append("Try to conduct ping manually to each device then check again.")
            checklog.append(f"Project checking terminated.")
            return passed, checklog
        checklog.append(f"Ping stage completed successfully.")

        passed = True
        return passed, checklog
