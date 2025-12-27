Write-Host "🚀 Shipping Perfection to Firebase (Google Ecosystem)..." -ForegroundColor Magenta

# 1. Build
Write-Host "🔨 Building React App..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build Failed. Aborting." -ForegroundColor Red
    exit 1
}

# 2. Deploy
Write-Host "☁️ Deploying to Firebase Hosting..." -ForegroundColor Cyan
firebase deploy --only hosting

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment Complete! The Frontend is LIVE." -ForegroundColor Green
    Write-Host "🌍 URL: https://metodoactiva.es" -ForegroundColor Yellow
}
else {
    Write-Host "❌ Deployment Failed." -ForegroundColor Red
}
