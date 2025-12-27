$Token = gcloud auth print-access-token
$KeyName = "projects/476151355322/locations/global/keys/3d50f1e4-14e3-4204-98e3-3d5c6c95fbb5"
$Url = "https://apikeys.googleapis.com/v2/$KeyName`?updateMask=restrictions"

# Empty restrictions object to clear them
$Body = @{
    restrictions = @{} 
} | ConvertTo-Json

Invoke-RestMethod -Uri $Url -Method Patch -Headers @{Authorization = "Bearer $Token" } -Body $Body -ContentType "application/json"
Write-Host "✅ Restrictions Cleared for $KeyName"
