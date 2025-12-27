# SCRIPT DE DESPLIEGUE FINAL (V9 - ABSOLUTE PATH & QUIET)
$ErrorActionPreference = 'Stop'

# 1. Definir Ruta Absoluta de gcloud (Detectada automáticamente)
$GCLOUD_PATH = "C:\Users\Usuario\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"

if (!(Test-Path $GCLOUD_PATH)) {
    Write-Host "⚠️ No encontré gcloud en la ruta estándar. Probando ruta corta..."
    # Fallback por si acaso
    $GCLOUD_PATH = "gcloud.cmd" 
}

Write-Host ">>> USANDO GCLOUD EN: $GCLOUD_PATH <<<" -ForegroundColor Cyan

# Función helper para ejecutar gcloud con comillas y argumentos
function Run-GCloud {
    param([string]$ArgString)
    # Usamos Invoke-Expression o Start-Process para manejar espacios en paths
    $proc = Start-Process -FilePath $GCLOUD_PATH -ArgumentList $ArgString -NoNewWindow -PassThru -Wait
    if ($proc.ExitCode -ne 0) { throw "Error en gcloud command: $ArgString" }
}

$PROJECT_ID = 'econeura-109cc'
$REGION = 'us-central1'
$REPO_NAME = 'cerebro-repo'
$SERVICE_NAME = 'metodo-activa-brain-v2'
$IMAGE_NAME = "us-central1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$SERVICE_NAME"

# 0. Ubicación (Auto-corrección)
$currentPath = (Get-Location).Path
if ($currentPath -like "*\backend") { 
    Write-Host "Detectado directorio 'backend'. Subiendo un nivel..."
    Set-Location ..
}

# 1. Configurar
Write-Host "1. Configurando Proyecto..."
Run-GCloud "config set project $PROJECT_ID --quiet"

# 2. Verificar/Crear Repositorio
Write-Host "2. Verificando Repositorio Docker..."
try {
    # Run-GCloud "artifacts repositories create $REPO_NAME --repository-format=docker --location=$REGION --description='Repo Cerebro' --quiet"
}
catch {
    Write-Host "   (El repo ya existe o hubo un warning, continuamos)" -ForegroundColor Yellow
}

# 3. Build
Write-Host "3. Construyendo Imagen (Push a $REPO_NAME)..."
if (!(Test-Path "backend/Dockerfile")) {
    Write-Host "❌ FATAL: No encuentro 'backend/Dockerfile'" -ForegroundColor Red
    exit 1
}

# Build con --quiet para evitar prompts
Run-GCloud "builds submit backend --tag $IMAGE_NAME --quiet"

# 4. Deploy
Write-Host "4. Desplegando Servicio Cloud Run..."
Run-GCloud "run deploy $SERVICE_NAME --image $IMAGE_NAME --region $REGION --allow-unauthenticated --memory 1Gi --quiet"

Write-Host ">>> OPERACION COMPLETADA AUTOMATICAMENTE <<<" -ForegroundColor Green
Write-Host "Busca la 'Service URL' arriba."
