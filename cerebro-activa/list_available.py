import requests
import json

API_KEY = "AIzaSyDaC9AVDoSXfKbIRuZZKkfNnDNFw2E8T5w"

def list_models():
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"
    try:
        response = requests.get(url)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            models = response.json().get('models', [])
            for m in models:
                if 'generateContent' in m.get('supportedGenerationMethods', []):
                    print(f"AVAILABLE: {m['name']}")
        else:
            print(response.text)
    except Exception as e:
        print(e)

list_models()
