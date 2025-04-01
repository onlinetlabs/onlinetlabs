from .auth      import APIAuth
from .test      import APITest


class Database:
    """
    """

    def __init__(self) -> None:
        self.auth:APIAuth = APIAuth()
        self.test:APITest = APITest()
