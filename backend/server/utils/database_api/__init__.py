from .auth      import APIAuth
from .lab       import APILab

from .test      import APITest


class Database:
    """
    """

    def __init__(self) -> None:
        self.auth:APIAuth   = APIAuth()
        self.lab:APILab     = APILab()

        self.test:APITest   = APITest()
