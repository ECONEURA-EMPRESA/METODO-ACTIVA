import subprocess
import requests
import json
import time

def create_and_get_key():
    print("🔑 GENERANDO NUEVA LLAVE MAESTRA...")
    
    # 1. Get Access Token
    try:
        token = subprocess.check_output("gcloud auth print-access-token", shell=True).decode().strip()
    except Exception as e:
        print(f"❌ Error Token: {e}")
        return

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    project = "project-c465bc45-299b-470d-8b6"
    
    # 2. CREATE KEY
    url_create = f"https://apikeys.googleapis.com/v2/projects/{project}/locations/global/keys"
    body = {
        "displayName": "Clave Maestra Gemini 2025",
        "restrictions": {} # Empty = Unrestricted
    }
    
    resp = requests.post(url_create, headers=headers, json=body)
    if resp.status_code != 200:
        print(f"❌ Error Create: {resp.text}")
        return

    op_name = resp.json()['name']
    print(f"⏳ Operación iniciada: {op_name}")
    
    # 3. POLL OPERATION
    url_op = f"https://apikeys.googleapis.com/v2/{op_name}"
    
    for i in range(10):
        time.sleep(2)
        resp_op = requests.get(url_op, headers=headers)
        data = resp_op.json()
        
        if "response" in data:
            key_data = data["response"]
            key_string = key_data["keyString"]
            print("\n✅ ¡NUEVA LLAVE CREADA!")
            print(f"KEY: {key_string}")
            return key_string
        
        print(".", end="", flush=True)

if __name__ == "__main__":
    create_and_get_key()
