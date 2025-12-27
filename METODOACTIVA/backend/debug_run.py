import os
import sys

print("--- DEBUG START ---", flush=True)
print(f"Python Version: {sys.version}", flush=True)
print(f"Working Directory: {os.getcwd()}", flush=True)
print(f"Contents of .: {os.listdir('.')}", flush=True)
try:
    print(f"Contents of app: {os.listdir('app')}", flush=True)
except Exception as e:
    print(f"Error listing app: {e}", flush=True)
print("--- DEBUG END ---", flush=True)

# Keep alive briefly so logs flush
import time
time.sleep(5)
