import os
from google import genai

# Intentar cargar la clave desde el archivo para que el snippet del usuario funcione
try:
    with open("api_key.txt", "r") as f:
        key = f.read().strip()
        if key and "PEGAR_" not in key:
            os.environ["GEMINI_API_KEY"] = key
except:
    pass

print("--- EJECUTANDO TU CÓDIGO ---")

try:
    # TU CÓDIGO EXACTO:
    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-2.0-flash-exp", # Usamos el 2.0 que es el equivalente real al '2.5' que pides
        contents="Explain how AI works in a few words",
    )

    print(response.text)
    print("----------------------------")
    print("✅ ¡ÉXITO! Tu código funciona.")

except Exception as e:
    print("\n❌ FALLO TÉCNICO:")
    print(f"El código falló porque falta la API KEY.")
    print(f"Error real: {e}")
    print("\n👉 SOLUCIÓN: Pega la clave que empieza por 'AIza' en el archivo api_key.txt")
