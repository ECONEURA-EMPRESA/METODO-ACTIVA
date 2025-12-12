import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# --- CONFIGURACIÓN GOOGLE GENERATIVE AI (HARDCODED DEBUG) ---
# Forzamos la clave para descartar errores de inyección de variables
GEMINI_API_KEY = "AIzaSyD7WsAUq-eQi4eS6p_bRSFnYUT-KxTD72w"

app = FastAPI(title="Cerebro Método Activa API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
try:
    genai.configure(api_key=GEMINI_API_KEY)
    # Usamos 'gemini-pro' (Estándar Global) para máxima compatibilidad
    model = genai.GenerativeModel('gemini-pro') 
except Exception as e:
    print(f"Warning: GenAI init failed: {e}")

class ChatInput(BaseModel):
    message: str = Field(..., min_length=2, max_length=1000)
    user_context: str = Field("general")

class ChatResponse(BaseModel):
    response: str
    suggested_session: str | None = None

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat_with_aurora(data: ChatInput):
    if not model:
        raise HTTPException(status_code=503, detail="Brain not initialized")

    try:
        system_prompt = f"""
        Actúa como Aurora, experta en Musicoterapia.
        Contexto usuario: {data.user_context}.
        Objetivo: Conectar y recomendar Método Activa.
        Sé concisa y cálida.
        """
        
        response = model.generate_content(f"{system_prompt}\nUsuario: {data.message}")
        
        return ChatResponse(
            response=response.text,
            suggested_session="Sesión de Calma (Flash)"
        )

    except Exception as e:
        print(f"Error AI: {e}")
        # --- FALLBACK: CEREBRO HEURÍSTICO (RESILIENCIA TOTAL) ---
        # Si Google falla (Billing/Quota/Region), el sistema NO cae.
        # Responde con guiones de venta probados.
        
        fallback_msg = "Lo siento, mi conexión neuronal es débil ahora. "
        msg_lower = data.message.lower()
        
        if "hola" in msg_lower or "buenos" in msg_lower:
            return ChatResponse(response="¡Hola! Soy Aurora. ¿En qué puedo ayudarte a mejorar tu bienestar hoy?", suggested_session="Introducción")
        
        if "precio" in msg_lower or "cuesta" in msg_lower or "valor" in msg_lower:
            return ChatResponse(response="El Método Activa tiene un valor incalculable para tu salud, pero hoy puedes acceder a la edición especial por solo 97€. ¿Te gustaría empezar?", suggested_session="Oferta Especial")
            
        if "ansiedad" in msg_lower or "estrés" in msg_lower or "nervios" in msg_lower:
            return ChatResponse(response="Entiendo perfectamente. La ansiedad es el cuerpo pidiendo pausa. Mi método utiliza frecuencias binaurales para calmar tu sistema nervioso en minutos. ¿Probamos una sesión corta?", suggested_session="Sesión Calma")
            
        if "ducha" in msg_lower or "baño" in msg_lower:
            return ChatResponse(response="¡La hidroterapia es clave! En el módulo 3 enseño cómo convertir tu ducha diaria en un spa regenerativo. Es fascinante.", suggested_session="Módulo Agua")

        # Respuesta genérica empática
        return ChatResponse(
            response="Te escucho. Parece que buscas un cambio positivo. Mi método combina ciencia y música para activarte. ¿Te gustaría saber cómo funciona?",
            suggested_session="Descubrimiento"
        )


@app.get("/")
def health_check():
    return {"status": "healthy", "mode": "Flash + Hardcoded Key"}
