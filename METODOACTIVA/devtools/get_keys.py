import subprocess
import requests
import json

def get_keys():
    # 1. Get Token
    try:
        token = subprocess.check_output("gcloud auth print-access-token", shell=True).decode().strip()
    except Exception as e:
        print(f"Error getting token: {e}")
        return

    # 2. Call API
    project = "project-c465bc45-299b-470d-8b6"
    url = f"https://apikeys.googleapis.com/v2/projects/{project}/locations/global/keys"
    
    headers = {"Authorization": f"Bearer {token}"}
    
    resp = requests.get(url, headers=headers)
    
    if resp.status_code == 200:
        data = resp.json()
        keys = data.get("keys", [])
        print(f"Found {len(keys)} keys.")
        for k in keys:
            print(f"ID: {k.get('name')}")
            print(f"Name: {k.get('displayName')}")
            print(f"KEY: {k.get('keyString')}") # THIS IS WHAT WE NEED
            print("-" * 20)
    else:
        print(f"Error API: {resp.status_code} - {resp.text}")

if __name__ == "__main__":
    get_keys()
