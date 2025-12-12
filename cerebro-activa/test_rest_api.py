import requests
import json
import os

API_KEY = "AIzaSyDaC9AVDoSXfKbIRuZZKkfNnDNFw2E8T5w"

def test_model(model_name, version="v1beta"):
    url = f"https://generativelanguage.googleapis.com/{version}/models/{model_name}:generateContent?key={API_KEY}"
    print(f"Testing: {model_name} ({version})...")
    
    payload = {
        "contents": [{
            "parts": [{"text": "Hello"}]
        }]
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print(f"✅ SUCCESS! {model_name} ({version}) WORKS.")
            try:
                print("Response:", response.json()['candidates'][0]['content']['parts'][0]['text'])
            except:
                pass
            return True
        else:
            print(f"❌ FAIL {model_name} ({version}): {response.status_code} - {response.text[:200]}")
            return False
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False

# Lista expandida
candidates = [
    ("gemini-pro", "v1beta"),
    ("gemini-1.5-flash", "v1beta"), # Retrying just in case
    ("gemini-1.5-flash", "v1"),     # Testing v1
    ("gemini-1.0-pro", "v1beta"),
    ("gemini-1.5-pro", "v1beta"),
    ("gemini-1.5-pro-latest", "v1beta")
]

success = False
for model, ver in candidates:
    if test_model(model, ver):
        success = True
        break
