# The goal of this file is to check whether the request is authorized
# or not. [ verification of the proteced route]

from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .auth_handler  import decodeJWT
from .model         import JWTPayloadSchema


class JWTBearer(HTTPBearer):
    """
        The main goal of this class is to check whether incoming requests
        are authorized by verifying the presence and validity of a JWT.
        It acts as a security layer for protected routes in a FastAPI
        application.
    """

    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)


    async def __call__(self, request: Request) -> JWTPayloadSchema:
        credentials:HTTPAuthorizationCredentials|None = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")

            jwt_payload:JWTPayloadSchema|None = self.payload_extract(jwtoken=credentials.credentials)

            if not self.verify_jwt(jwt_payload):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            # return credentials.credentials
            print(f"[DEBUG] Returning jwt_payload:\n{jwt_payload}")
            return jwt_payload
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")



    def payload_extract(self, jwtoken:str) -> JWTPayloadSchema|None:
        try:
            payload:JWTPayloadSchema|None = decodeJWT(jwtoken)
        except Exception as e:
            print(f"[DEBUG] Exception:\n{e}")
            payload = None

        return payload


    # def verify_jwt(self, jwtoken: str) -> bool:
    def verify_jwt(self, jwt_payload:JWTPayloadSchema|None) -> bool:
        isTokenValid: bool = False

        if jwt_payload:
            isTokenValid = True
        return isTokenValid
