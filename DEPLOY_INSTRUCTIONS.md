# 🚀 Comandos de Despliegue - Cerebro Activa (Python)

Ejecuta estos comandos en tu terminal (PowerShell o CMD) desde la carpeta raíz del proyecto (`METODO-ACTIVA`).

## 1. Moverse a la carpeta del cerebro
```powershell
cd cerebro-activa
```

## 2. Autenticarse en Google Cloud (si no lo has hecho)
```powershell
gcloud auth login
gcloud config set project project-c465bc45-299b-470d-8b6
```

## 3. Desplegar en Cloud Run
Este comando empaqueta tu código, lo sube y te devuelve una URL segura (`https://...`).

```powershell
gcloud run deploy agente-activa --source . --region us-central1 --allow-unauthenticated
```

---

### 🔥 Paso Final: Conectar la Web
Cuando termine el paso 3, Google te dará una **URL** (ej: `https://agente-activa-xyz.a.run.app`).

1. Ve a tu archivo `.env` en `METODOACTIVA`.
2. Añade/Edita esta línea:
   ```env
   VITE_PYTHON_API_URL=https://TU-URL-AQUI/chat
   ```
3. Vuelve a desplegar la web:
   ```powershell
   cd ..\METODOACTIVA
   npm run build
   firebase deploy --only hosting
   ```
