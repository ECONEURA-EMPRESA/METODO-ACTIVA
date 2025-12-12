import os
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from google import genai
import webbrowser

# --- CONFIGURACIÓN ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = None

def get_api_key():
    try:
        if os.path.exists("api_key.txt"):
            with open("api_key.txt", "r", encoding="utf-8") as f:
                key = f.read().strip()
                if key and "PEGAR_" not in key and len(key) > 20:
                    return key
    except:
        pass
    
    key = os.environ.get("GEMINI_API_KEY")
    if key and len(key) > 20: return key
    return None

@app.on_event("startup")
async def startup_event():
    global client
    print("\n" + "="*50)
    print("🚀 INICIANDO CEREBRO ACTIVA (PYTHON)")
    print("="*50)
    
    key = get_api_key()
    if key:
        try:
            client = genai.Client(api_key=key)
            print("✅ API Key encontrada. Cerebro conectado.")
        except Exception as e:
            print(f"❌ Error conectando a Google: {e}")
    else:
        print("⚠️  FALTA API KEY en api_key.txt")
        webbrowser.open("https://aistudio.google.com/app/apikey")

class ChatRequest(BaseModel):
    message: str
    user_type: str = "general"

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    global client
    
    if not client:
        key = get_api_key()
        if key:
            try:
                client = genai.Client(api_key=key)
            except:
                pass
    
    if not client:
        return {"response": "🧠 Cerebro desconectado. Falta API Key."}

    system_instruction = """
    Eres Aurora Del Río, experta en el 'Método Activa'.
    Ayudas a cuidadores y familiares con consejos sobre musicoterapia y neuroestética.
    Sé breve, empática y cita el libro si puedes.
    """
    
    # LISTA DE MODELOS A PROBAR (En orden de preferencia)
    # 1. El que pidió el usuario (o su equivalente real)
    # 2. El más potente experimental
    # 3. El más estable
    candidate_models = [
        "gemini-2.0-flash-exp",           # Potente y rápido
        "gemini-2.5-flash-native-audio-latest", # Tu petición '2.5'
        "gemini-1.5-pro-latest",          # Estable Pro
        "gemini-1.5-flash-latest",        # Estable Flash
        "models/gemini-1.5-flash"         # Fallback clásico
    ]

    last_error = None

    for model_name in candidate_models:
        try:
            print(f"🧠 Intentando pensar con: {model_name}...")
            response = client.models.generate_content(
                model=model_name, 
                contents=f"{system_instruction}\n\nUsuario: {request.message}",
            )
            return {"response": response.text}
        except Exception as e:
            print(f"⚠️ {model_name} falló: {e}")
            last_error = e
            continue
            
    return {"response": f"Lo siento, mis neuronas están agotadas hoy (Error de Cuota/Modelo). Inténtalo más tarde. ({last_error})"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
