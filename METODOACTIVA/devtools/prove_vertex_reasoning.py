import subprocess
import requests
import json
import time

PROJECT_ID = "project-c465bc45-299b-470d-8b6"
REGION = "us-central1"
# Vertex AI Endpoint (Enterprise)
URL = f"https://{REGION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{REGION}/publishers/google/models/gemini-1.5-flash:generateContent"

print("🧠 CONECTANDO CON VERTEX AI (ENTERPRISE - IAM)...")
print("==================================================")

def get_access_token():
    try:
        return subprocess.check_output("gcloud auth print-access-token", shell=True).decode().strip()
    except Exception as e:
        print(f"❌ Error getting token: {e}")
        return None

def ask_vertex(scenario, prompt):
    token = get_access_token()
    if not token: return
    
    print(f"\n🧪 ESCENARIO: {scenario}")
    print(f"   📤 Prompt: {prompt[:100]}...")
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "contents": [{
            "role": "user",
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1024
        }
    }
    
    start = time.time()
    try:
        response = requests.post(URL, json=payload, headers=headers, timeout=30)
        elapsed = round(time.time() - start, 2)
        
        if response.status_code == 200:
            data = response.json()
            try:
                # Vertex AI response structure
                text = data['candidates'][0]['content']['parts'][0]['text']
                print(f"   🤖 RAZONAMIENTO ({elapsed}s):")
                print(f"   --------------------------------------------------")
                print(f"   {text}")
                print(f"   --------------------------------------------------")
                return True
            except:
                print(f"   ⚠️ Respuesta inesperada: {data}")
        else:
            print(f"   ❌ ERROR {response.status_code}: {response.text}")
            print("   (Verifica que Vertex AI API esté habilitada y el usuario tenga permisos)")
            return False
            
    except Exception as e:
        print(f"   ❌ EXCEPTION: {e}")
        return False

# 1. EMPATÍA (Alzheimer)
p1 = """
Eres Aurora, una IA experta en musicoterapia basada en el Método Activa.
Tu tono es cálido, profesional y profundamente humano.
Usuario: "Hoy mi madre me ha mirado y me ha llamado 'Señora'. Me he ido al baño a llorar. Siento que la he perdido para siempre."
Responde validando su dolor y explicando cómo la música puede reconectar esa identidad perdida, sin prometer curas falsas.
"""
ask_vertex("EMPATIA PROFUNDA", p1)

# 2. LOGICA (TDAH)
p2 = """
Eres Aurora.
Usuario: "¿Cómo ayuda el ritmo a un niño con TDAH? Dame el mecanismo biológico."
Responde explicando el concepto de "Sincronización Motora" y "Dopamina" de forma clara y lógica.
"""
ask_vertex("RAZONAMIENTO TÉCNICO", p2)

# 3. CONVERSIÓN
p3 = """
Eres Aurora.
Usuario: "¿Por qué comprar el libro '21 Sesiones para Conectar' si ya tengo internet?"
Responde destacando el valor de la "Metodología Estructurada" y la "Seguridad Clínica".
"""
ask_vertex("ARGUMENTACIÓN COMERCIAL", p3)
