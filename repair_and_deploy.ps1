# SCRIPT DE REPARACION Y DESPLIEGUE (V7 - MODERN STANDARD)
$ErrorActionPreference = 'Stop'
$PROJECT_ID = 'project-c465bc45-299b-470d-8b6'
$REGION = 'us-central1'
$SERVICE_NAME = 'cerebro-activa-pro'
$REPO_NAME = 'cerebro-repo'
# Usamos el nuevo formato estándar de Google (pkg.dev) que no falla
$IMAGE_NAME = "us-central1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$SERVICE_NAME"

Write-Host ">>> INICIANDO PROTOCOLO V7 (ESTANDAR MODERNO) <<<" -ForegroundColor Cyan

# 0. Corregir Ubicación (Si el usuario quedó en 'backend')
if ((Get-Location).Path -like "*\backend") {
    Write-Host "Detectado directorio 'backend'. Subiendo un nivel..."
    Set-Location ..
}

# 1. Configurar
cmd /c "gcloud config set project $PROJECT_ID"
cmd /c "gcloud services enable artifactregistry.googleapis.com"

# 2. Crear Repositorio de Artefactos (Evita el error 'gcr.io not found')
Write-Host "1. Creando Repositorio de Artefactos ($REPO_NAME)..."
try {
    # Intentamos crear el repo. Si ya existe, dará error pero no importa.
    cmd /c "gcloud artifacts repositories create $REPO_NAME --repository-format=docker --location=$REGION --description='Repositorio Cerebro Activa'" 2>&1 | Out-Null
}
catch { }

# 3. Build (Construcción)
Write-Host "2. Construyendo Imagen en $REPO_NAME..."
if (!(Test-Path "backend/Dockerfile")) {
    Write-Host "Error Fatal: No encuentro backend/Dockerfile desde $(Get-Location)" -ForegroundColor Red
    exit 1
}

# Usamos el nuevo nombre de imagen (pkg.dev)
cmd /c "gcloud builds submit backend --tag $IMAGE_NAME"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR FATAL EN BUILD. Revisa los logs." -ForegroundColor Red
    exit 1
}

# 4. Deploy
Write-Host "3. Desplegando Servicio..."
cmd /c "gcloud run deploy $SERVICE_NAME --image $IMAGE_NAME --region $REGION --allow-unauthenticated --memory 1Gi"

Write-Host ">>> EXITO <<<" -ForegroundColor Green
Write-Host "Por favor copia la Service URL de arriba."
