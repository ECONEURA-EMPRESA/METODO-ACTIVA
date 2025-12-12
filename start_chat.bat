@echo off
echo ==========================================
echo    INICIANDO CEREBRO ACTIVA (PYTHON)
echo ==========================================

cd cerebro-activa

echo 1. Instalando librerias necesarias...
pip install fastapi uvicorn google-genai

echo.
echo 2. Arrancando servidor...
python local_server.py

pause
