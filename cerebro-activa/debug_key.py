import requests
import json

API_KEY = "AIzaSyDaC9AVDoSXfKbIRuZZKkfNnDNFw2E8T5w"

def test():
    print("Testing gemini-pro key...")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}"
    
    try:
        response = requests.post(url, json={
            "contents": [{"parts": [{"text": "Hello"}]}]
        })
        print(f"Status: {response.status_code}")
        print(f"Body: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

test()
