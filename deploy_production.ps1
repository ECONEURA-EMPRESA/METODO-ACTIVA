# SCRIPT DE DESPLIEGUE V5 (AUTO-REPARACION)
$ErrorActionPreference = 'Stop'
$PROJECT_ID = 'project-c465bc45-299b-470d-8b6'
$REGION = 'us-central1'
$SERVICE_NAME = 'cerebro-activa-pro'
$IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME"
# Obtenido del error log del usuario
$PROJECT_NUMBER = '476151355322' 
$COMPUTE_SA = "$PROJECT_NUMBER-compute@developer.gserviceaccount.com"
$BUILD_SA = "$PROJECT_NUMBER@cloudbuild.gserviceaccount.com"

Write-Host "--- INICIANDO PROTOCOLO DE REPARACION (V5) ---" -ForegroundColor Cyan

# 1. Configurar
Write-Host "1. Configurando Proyecto..."
cmd /c "gcloud config set project $PROJECT_ID"

# 2. Reparar Permisos (La Magia)
Write-Host "2. Reparando Permisos de Google (IAM)..."
Write-Host "Otorgando acceso de Storage a la cuenta de servicio: $COMPUTE_SA"

# Intento 1: Reparar cuenta Compute
try {
    cmd /c "gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:$COMPUTE_SA --role=roles/storage.admin"
}
catch {
    Write-Host "Aviso: No se pudo modificar IAM (quizas ya lo tienes). Continuamos." -ForegroundColor Yellow
}

# Intento 2: Reparar cuenta CloudBuild (por si acaso)
try {
    cmd /c "gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:$BUILD_SA --role=roles/storage.admin"
}
catch { }

Write-Host "Esperando 10 segundos para que Google propague los permisos..."
Start-Sleep -Seconds 10

# 3. Build
Write-Host "3. Construyendo Imagen..."
Set-Location backend
if (!(Test-Path Dockerfile)) {
    Write-Host "Error: No encuentro backend/Dockerfile" -ForegroundColor Red
    exit 1
}

try {
    cmd /c "gcloud builds submit --tag $IMAGE_NAME"
}
catch {
    Write-Host "Error en Build" -ForegroundColor Red
    exit 1
}

# 4. Deploy
Write-Host "4. Desplegando Servicio..."
try {
    cmd /c "gcloud run deploy $SERVICE_NAME --image $IMAGE_NAME --region $REGION --allow-unauthenticated --memory 1Gi"
}
catch {
    Write-Host "Error en Deploy" -ForegroundColor Red
    exit 1
}

Write-Host "--- FIN EXITOSO ---" -ForegroundColor Green
Write-Host "Por favor copia la Service URL que aparece arriba."
Start-Sleep -Seconds 5
