# Usamos una imagen ligera de Python 3.9
FROM python:3.9-slim

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos las dependencias
COPY requirements.txt .

# Instalamos las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código
COPY . .

# Exponemos el puerto 8080
EXPOSE 8080

# Comando para arrancar la aplicación
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
