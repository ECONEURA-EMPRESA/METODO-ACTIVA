import requests
import json
import time

# 🌍 ENDPOINT DE PRODUCCIÓN (DIRECTO CLOUD RUN V2)
URL = "https://metodo-activa-brain-v2-6tbh2ch5wa-uc.a.run.app/api/v1/chat"

print("🧠 INICIANDO DIAGNÓSTICO DE RAZONAMIENTO PROFUNDO (AURORA AI)...")
print("==================================================================")

# ⚙️ CREDENCIALES
API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_API_KEY_HERE") # La llave desbloqueada

def get_token():
    try:
        url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}"
        resp = requests.post(url, json={"returnSecureToken": True})
        if resp.status_code == 200:
            return resp.json()['idToken']
        print(f"⚠️ Auth Failed: {resp.text}")
    except Exception as e:
        print(f"⚠️ Auth Error: {e}")
    return None

def talk_to_aurora(scenario_name, message, context="General"):
    print(f"\n🧪 ESCENARIO: {scenario_name}")
    print(f"   🗣️ Usuario: {message}")
    print(f"   ℹ️ Contexto: {context}")
    
    # FORZAR MODO INVITADO (SIN TOKEN)
    headers = {"Content-Type": "application/json"}
    
    payload = {
        "message": message,
        "user_context": context
    }
    
    start = time.time()
    try:
        response = requests.post(URL, json=payload, headers=headers, timeout=30)
        elapsed = round(time.time() - start, 2)
        
        if response.status_code == 200:
            data = response.json()
            reply = data.get("response")
            print(f"   🤖 Aurora ({elapsed}s):")
            print(f"   --------------------------------------------------")
            print(f"   {reply}")
            print(f"   --------------------------------------------------")
            return True
        else:
            print(f"   ❌ ERROR {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ EXCEPTION: {e}")
        return False

# BATALLA DE RAZONAMIENTO
# Escenario 1: Empatía Compleja (Alzheimer)
# Reto: Validar emoción y ofrecer solución no médica pero terapéutica.
talk_to_aurora(
    "1. DOLOR & OLVIDO", 
    "Hoy mi madre me ha mirado y me ha llamado 'Señora'. Me he ido al baño a llorar. Siento que la he perdido para siempre.",
    "Hija cuidadora, agotada emocionalmente"
)

# Escenario 2: Estrategia Técnica (TDAH)
# Reto: Explicar MECANISMO científico de la música en el cerebro hiperactivo.
talk_to_aurora(
    "2. CAOS & ORDEN", 
    "Entiendo que la música relaje, pero ¿cómo va a ayudar a mi hijo con TDAH a hacer los deberes? Necesito lógica, no magia.",
    "Padre escéptico, busca ciencia"
)

# Escenario 3: Cierre de Venta (Persuasión Ética)
# Reto: Vender el libro sin ser agresiva, basándose en la necesidad detectada.
talk_to_aurora(
    "3. SOLUCIÓN FINAL", 
    "Me convence lo que dices. Pero, ¿por qué comprar el libro si ya tengo Spotify?",
    "Usuario interesado pero duda del valor"
)
