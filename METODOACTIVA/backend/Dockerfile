# 🦅 PHOENIX PROTOCOL DOCKERFILE
# Estricto, Limpio, Aislado.

# 1. Builder Stage
FROM python:3.11-slim as builder

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

# Crear Virtual Environment Real
RUN python -m venv /opt/venv
# Activar VENV para las siguientes instrucciones
ENV PATH="/opt/venv/bin:$PATH"

# Instalar dependencias en el VENV
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 2. Final Stage
FROM python:3.11-slim

WORKDIR /app

# Copiar el VENV desde builder (Aislamiento Total)
COPY --from=builder /opt/venv /opt/venv
# Activar VENV globalmente
ENV PATH="/opt/venv/bin:$PATH"

# Crear usuario non-root
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copiar código
COPY . .

# Permisos
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8080

# Al usar VENV activado en PATH, 'uvicorn' se resuelve correctamente
CMD ["uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1"]
