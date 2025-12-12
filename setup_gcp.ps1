# ------------------------------------------------------------------
# SCRIPT DE DESPLIEGUE AUTOMÁTICO - METODO ACTIVA (GCP)
# ------------------------------------------------------------------
# Este script configura tu entorno Google Cloud y despliega el "Cerebro Python".
# Requisito: Tener 'gcloud CLI' instalado.

Write-Host "🔵 Verificando instalación de gcloud..." -ForegroundColor Cyan
if (!(Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Host "❌ ERROR: gcloud no está instalado." -ForegroundColor Red
    Write-Host "👉 Por favor, instala Google Cloud SDK primero: https://cloud.google.com/sdk/docs/install"
    exit 1
}

$PROJECT_ID = "project-c465bc45-299b-470d-8b6" # Tu ID de proyecto
$REGION = "us-central1"
$SERVICE_NAME = "cerebro-activa-v2"

Write-Host "✅ gcloud detectado." -ForegroundColor Green
Write-Host "🔵 Iniciando proceso de autenticación..." -ForegroundColor Cyan

# 1. Login General
Write-Host "1️⃣ Login en Google Cloud..."
cmd /c "gcloud auth login"

# 2. Configurar Proyecto
Write-Host "2️⃣ Configurando proyecto $PROJECT_ID..."
cmd /c "gcloud config set project $PROJECT_ID"

# 3. Habilitar APIs (Vertex AI, Cloud Run, Cloud Build)
Write-Host "3️⃣ Habilitando APIs 'Vertex AI' y 'Cloud Run' (Esto puede tardar)..."
cmd /c "gcloud services enable aiplatform.googleapis.com run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com"

# 4. Login para Application Default (Para pruebas locales Python)
Write-Host "4️⃣ Configurando credenciales locales (ADC)..."
cmd /c "gcloud auth application-default login"

# 5. Despliegue a Cloud Run
Write-Host "🚀 DESPLEGANDO CEREBRO A LA NUBE (Build & Deploy)..." -ForegroundColor Magenta
Set-Location "cerebro-activa"
# Despliegue directo desde código fuente (sin docker local req)
cmd /c "gcloud run deploy $SERVICE_NAME --source . --region $REGION --allow-unauthenticated"

Write-Host "✅ PROCESO COMPLETADO." -ForegroundColor Green
Write-Host "Copia la URL que aparece arriba (Service URL) y pégala en el chat."
