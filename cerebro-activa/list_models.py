import os
from google import genai

try:
    with open("api_key.txt", "r") as f:
        os.environ["GEMINI_API_KEY"] = f.read().strip()
except:
    pass

print("--- LISTADO DE MODELOS ---")

try:
    client = genai.Client()
    for m in client.models.list():
        print(f"Model: {m.name}")

except Exception as e:
    print(f"❌ Error: {e}")
