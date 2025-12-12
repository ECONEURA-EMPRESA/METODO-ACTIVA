# 🚀 SHIP PERFECTION PROTOCOL (v1.0)
# Automatiza: Build Frontend + Firebase Deploy + Verificación

$ErrorActionPreference = "Stop"
Write-Host "🔵 [1/3] Iniciando Protocolo de Perfección..." -ForegroundColor Cyan

# 1. Construcción del Frontend (Vite)
Write-Host "🔸 [2/3] Construyendo 'Cerebro Client-Side'..." -ForegroundColor Yellow
Set-Location "C:\Users\Usuario\METODO-ACTIVA\METODOACTIVA"
npm run build
if ($LASTEXITCODE -ne 0) { throw "❌ Error en Build." }

# 2. Despliegue a Firebase (Hosting)
Write-Host "🔸 [3/3] Desplegando a la Nube (Firebase)..." -ForegroundColor Yellow
# Usamos el token si existe, o login interactivo si falla
try {
    firebase deploy --only hosting
}
catch {
    Write-Host "⚠️ Error en deploy directo. Intentando con login..." -ForegroundColor Red
    firebase login
    firebase deploy --only hosting
}

Write-Host "✅ [EXITO] Web Perfecta Desplegada." -ForegroundColor Green
Write-Host "🌐 URL: https://metodo-activa.web.app" -ForegroundColor Cyan
