import firebase_admin
from firebase_admin import auth, credentials
from fastapi import HTTPException, status
import logging

# Inicializar Firebase Admin (Usa credenciales de Google Cloud por defecto)
# En Cloud Run, detecta automáticamente la Service Account.
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

logger = logging.getLogger("auth")

def verify_firebase_token(token: str) -> dict:
    """
    🔐 Verifica la firma criptográfica del token JWT de Firebase.
    Si es inválido o expirado, lanza HTTPException 401.
    Retorna el payload (uid, email, etc).
    """
    try:
        # 1. Limpiar prefijo "Bearer "
        if token.startswith("Bearer "):
            token = token.split("Bearer ")[1]
        
        # 2. Verificar con Google (Esto descarga las llaves públicas de Google)
        decoded_token = auth.verify_id_token(token)
        
        # 3. Retornar identidad del usuario
        return decoded_token
        
    except auth.ExpiredIdTokenError:
        logger.warning("Auth Failed: Token Expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except auth.InvalidIdTokenError:
        logger.warning("Auth Failed: Invalid Token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        logger.error(f"Auth Failed: System Error - {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed",
            headers={"WWW-Authenticate": "Bearer"},
        )
