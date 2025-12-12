# Usamos una imagen oficial ligera de Python (Best Practice de seguridad)
FROM python:3.10-slim

# Evita que Python genere archivos .pyc y fuerza logs en tiempo real
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instalamos dependencias primero (Para aprovechar la caché de Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el código
COPY . .

# El puerto lo inyecta Google Cloud Run
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}
