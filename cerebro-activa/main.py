from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import vertexai
from vertexai.generative_models import GenerativeModel
import os

# Configuración
app = FastAPI()

# Configurar CORS para permitir peticiones desde la web (localhost y producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, restringir a https://metodoactiva.es
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializamos Vertex AI con tu ID de proyecto real
# NOTA: Este ID debe coincidir con el de tu proyecto en Google Cloud
# project-c465bc45-299b-470d-8b6 es tu ID actual
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "project-c465bc45-299b-470d-8b6")
LOCATION = "us-central1"

try:
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    # Usamos gemini-1.5-pro-001 para el contexto masivo de 1M tokens
    model = GenerativeModel("gemini-1.5-pro-001")
except Exception as e:
    print(f"Error inicializando Vertex AI: {e}")
    model = None

# Definir la personalidad del Agente
SYSTEM_PROMPT = """
Eres Aurora AI, asistente experta del 'Método Activa' y especialista en Musicoterapia.
Tu misión es ayudar a:
1. Cuidadores de ancianos (foco en soledad, memoria, vitalidad).
2. Padres de niños con TDAH/Autismo (foco en regulación, calma, vínculo).

Tus respuestas deben ser:
- Empáticas, cálidas y humanas (usa el concepto 'El Arte de Conectar').
- Basadas en musicoterapia clínica y regulación del sistema nervioso.
- Siempre intenta relacionar la respuesta con una de las 21 Sesiones del libro si aplica.
- No des diagnósticos médicos.
- Sé breve y directa (máximo 3 párrafos).
"""

class ChatRequest(BaseModel):
    message: str
    user_type: str = "general" # 'cuidador', 'padre', 'general'

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Cerebro Activa AI"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not model:
        raise HTTPException(status_code=503, detail="Servicio de IA no disponible (Vertex AI Init Failed)")
        
    try:
        # Iniciamos chat (sin historial por ahora para mantenerlo stateless y barato)
        chat = model.start_chat()
        
        # Enviamos el prompt asumiendo el rol definido
        full_prompt = f"{SYSTEM_PROMPT}\nContexto Usuario: {request.user_type}\nMensaje Usuario: {request.message}"
        
        response = chat.send_message(full_prompt)
        
        # Enviar texto limpio
        return {"response": response.text}
    
    except Exception as e:
        print(f"Error generando respuesta: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Puerto definido por la variable PORT (requerido por Cloud Run) o 8080 por defecto
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
