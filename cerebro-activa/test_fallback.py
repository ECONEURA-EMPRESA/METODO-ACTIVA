import os
from google import genai

# Cargar clave
try:
    with open("api_key.txt", "r") as f:
        os.environ["GEMINI_API_KEY"] = f.read().strip()
except:
    pass

print("--- PROBANDO MODELO ESTABLE (1.5) ---")

try:
    client = genai.Client()
    # Usamos 1.5-flash explícitamente para verificar que este SÍ funciona
    response = client.models.generate_content(
        model="gemini-1.5-flash", 
        contents="Say 'System Operational' if you read this.",
    )
    print(response.text)
    print("✅ ¡MODELO 1.5 OPERATIVO!")

except Exception as e:
    print(f"❌ Error en 1.5: {e}")
