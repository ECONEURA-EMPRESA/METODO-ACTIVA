# 🚀 DEPLOY BACKEND TO CLOUD RUN
$PROJECT_ID = "metodo-activa"
$SERVICE_NAME = "metodo-activa-brain"

Write-Host "🚢 INICIANDO DESPLIEGUE CLOUD RUN..." -ForegroundColor Cyan
Write-Host "📌 Project: $PROJECT_ID" -ForegroundColor Gray

gcloud config set project $PROJECT_ID
gcloud builds submit --config cloudbuild.yaml .
