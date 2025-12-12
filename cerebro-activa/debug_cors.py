import requests
import json
import time

API_KEY = "AIzaSyDaC9AVDoSXfKbIRuZZKkfNnDNFw2E8T5w"
# Model verified previously
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
ORIGIN = "https://project-c465bc45-299b-470d-8b6.web.app"

payload = {
    "contents": [{
        "parts": [{"text": "Test 5 times"}]
    }]
}

headers = {
    "Content-Type": "application/json",
    "Origin": ORIGIN,
    "Referer": ORIGIN
}

print(f"🔬 DIAGNOSTIC MODE: Simulating 5 browser requests from {ORIGIN}")

success_count = 0
for i in range(1, 6):
    print(f"\n--- Attempt {i}/5 ---")
    try:
        response = requests.post(URL, json=payload, headers=headers)
        if response.status_code == 200:
            print("✅ 200 OK")
            print(response.text[:100] + "...")
            success_count += 1
        else:
            print(f"❌ FAIL: {response.status_code}")
            print(f"Body: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {e}")
    time.sleep(1)

if success_count == 5:
    print("\n✅ DIAGNOSIS: The API works perfectly with Origin headers. The issue is likely network-local or browser-specific.")
else:
    print("\n❌ DIAGNOSIS: The API blocks requests from this Origin. We MUST use a Proxy (Cloud Function).")
