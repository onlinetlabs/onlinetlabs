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

try:
    # Package mode import
    from utils.labs_checker.CheckerInterface    import CheckerInterface
except:
    # Direct script mode import
    from CheckerInterface   import CheckerInterface






# --------- #
# CONSTANTS #


#############
#  CLASSES  #
#############

class Checker02(CheckerInterface):
    

    async def lab_perform_check(
            self,
            token:str,
            project_id:str,
            ) -> None:
        """
        Algotithm to check the fiest lab: 'routing-in-ip-networks'.
        """
        
        passed:bool = False

        # OPEN PROJECT
        project_opened:bool = await self.project_open(
                token,
                project_id,
                )
        if not project_opened:
            self.checklog["Проект открыт"] = False
            return
        self.checklog["Проект открыт"] = True


        # GET PROJECT's NODEs
        nodes:list[dict]|None = \
                await self.project_nodes_get(token, project_id)
        if nodes is None:
            self.checklog["Параметры узлов проекта получены"] = False
            return
        self.checklog["Параметры узлов проекта получены"] = True
        

        # RETREIVE KEY NODES
        key_nodes_names = [
                "PC1",
                "PC4",
                "PC5",
                "R1",
                "R2",
                "R3",
                "R4",
                ]
        key_nodes:list[dict] = []
        for node_name in key_nodes_names:
            node:dict|None = await self.project_nodes_get_node_by_name(
                    node_name, nodes)
            if node is None:
                self.checklog[f"Ключевые узлы обнаружены"] = False
                return
            key_nodes.append(node)

        if len(key_nodes) == 0 or len(key_nodes) != 7:
            self.checklog[f"Ключевые узлы обнаружены"] = False
            return
        self.checklog[f"Ключевые узлы обнаружены"] = True


        # START ALL PROJECTS NODES
        nodes_started:bool = await self.project_nodes_start(
                token, project_id)
        if not nodes_started:
            self.checklog[f"Узлы проекта запущены"] = False
            return
        self.checklog[f"Узлы проекта запущены"] = True


        # CHECK RIP ON EACH ROUTER
        R1 = key_nodes[3]
        R2 = key_nodes[4]
        R3 = key_nodes[5]
        R4 = key_nodes[6]
        routers = [R1, R2, R3, R4]
        # Slise only VPCS
        key_nodes = key_nodes[:3]

        async def router_check_rip_task(router):
            result:bool = await self.router_check_rip(node=router)
            if not result:
                self.checklog[f"Роутер {router['name']} использует RIP"] = False
            else:
                self.checklog[f"Роутер {router['name']} использует RIP"] = True
        
        tasks = []
        for router in routers:
            task = asyncio.create_task(
                    router_check_rip_task(router))
            tasks.append(task)

        await asyncio.gather(*tasks)


        # GATHER VPCS IPs
        key_nodes_ip:list[str] = []
        for node in key_nodes:
            node_ip:str|None = await self.get_vpcs_ip(node)
            if node_ip is None:
                self.checklog[f"Извлечены IP адреса ключевых узлов"] = False
                return
            key_nodes_ip.append(node_ip)
        self.checklog[f"Извлечены IP адреса ключевых узлов"] = True


        # PERFORM PING BETWEEN KEY NODES
        src_dst_list:list[tuple[dict,str]] = [
                (key_nodes[0], key_nodes_ip[1]),
                (key_nodes[0], key_nodes_ip[2]),
                (key_nodes[1], key_nodes_ip[2]),
                ]

        for ping_pair in src_dst_list:
            src = ping_pair[0]
            dst = ping_pair[1]
            result:bool = await self.project_nodes_ping(src, dst)
            if not result:
                self.checklog[f"Проверка доступности ({src['name']}) -> ({dst})"] = False
            else:
                self.checklog[f"Проверка доступности ({src['name']}) -> ({dst})"] = True

        return
