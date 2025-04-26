from .auth      import APIAuth
from .lab       import APILab
from .control   import APIControl

from .test      import APITest


class Database:
    """
    """

    def __init__(self) -> None:
        self.auth:APIAuth   = APIAuth()
        self.lab:APILab     = APILab()
        self.control:APIControl = APIControl()

        self.test:APITest   = APITest()
