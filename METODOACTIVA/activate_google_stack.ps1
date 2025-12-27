# ☁️ GOOGLE CLOUD ACTIVATION PROTOCOL
# Automates the enabling of all required APIs for the Full-Stack Architecture.

$PROJECT_ID = "metodo-activa" # Authentic Project ID
# Or usage: .\activate_google_stack.ps1 -ProjectId "your-project-id"

param(
    [string]$ProjectId = "metodo-activa"
)

Write-Host "🚀 INICIANDO PROTOCOLO DE ACTIVACIÓN GOOGLE CLOUD..." -ForegroundColor Cyan
Write-Host "📌 Project ID: $ProjectId" -ForegroundColor Gray

# 1. Configurar Proyecto
Write-Host "⚙️ Configurando proyecto activo..." -ForegroundColor Yellow
gcloud config set project $ProjectId

# 2. Habilitar APIs
$apis = @(
    "aiplatform.googleapis.com",       # Vertex AI
    "run.googleapis.com",              # Cloud Run
    "cloudbuild.googleapis.com",       # Cloud Build
    "artifactregistry.googleapis.com", # Artifact Registry
    "cloudfunctions.googleapis.com",   # Cloud Functions
    "firestore.googleapis.com",        # Firestore
    "storage.googleapis.com",          # Cloud Storage
    "bigquery.googleapis.com",         # BigQuery
    "secretmanager.googleapis.com",    # Secret Manager
    "identitytoolkit.googleapis.com",  # Firebase Auth
    "logging.googleapis.com",          # Cloud Logging
    "monitoring.googleapis.com",       # Cloud Monitoring
    "eventarc.googleapis.com"          # Eventarc
)

foreach ($api in $apis) {
    Write-Host "🔌 Habilitando API: $api ..." -NoNewline
    try {
        gcloud services enable $api
        Write-Host " ✅" -ForegroundColor Green
    }
    catch {
        Write-Host " ❌ Error habilitando $api" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host "`n✅ ¡ECOSISTEMA GOOGLE FULL-STACK ACTIVADO!" -ForegroundColor Green
Write-Host "La infraestructura está lista para el despliegue de Servicios." -ForegroundColor White
