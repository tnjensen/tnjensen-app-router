# Auto-deploy ved filendringer
# Kjør fra repo-mappa: .\auto-deploy.ps1

$VPS_HOST = "46.250.220.244"
$VPS_USER = "tnjensen"
$SSH_KEY = "$env:USERPROFILE\.ssh\id_ed25519"
$REMOTE_DIR = "/var/www/tnjensen.no"

Write-Host "=== Auto-deploy aktiv ===" -ForegroundColor Cyan
Write-Host "Overvåker endringer i:" -ForegroundColor Gray
Write-Host "  src/" -ForegroundColor Gray
Write-Host "  Trykk Ctrl+C for å avslutte" -ForegroundColor Gray
Write-Host ""

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = Get-Location
$watcher.IncludeSubdirectories = $true
$watcher.Filter = "*.tsx"
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite

$deploy = {
    $time = Get-Date -Format "HH:mm:ss"
    Write-Host "[$time] Filendring oppdaget, deployer..." -ForegroundColor Yellow

    tar czf deploy.tar.gz --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".github" --exclude="deploy.tar.gz" .
    scp -i $SSH_KEY -o StrictHostKeyChecking=no deploy.tar.gz "$VPS_USER@$VPS_HOST`:/tmp/"
    ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "cd $REMOTE_DIR && rm -rf * && tar xzf /tmp/deploy.tar.gz && rm /tmp/deploy.tar.gz && npm install --legacy-peer-deps && npm run build && (pm2 reload tnjensen-app || pm2 start npm --name tnjensen-app -- start) && pm2 save"
    Remove-Item deploy.tar.gz -Force

    $time = Get-Date -Format "HH:mm:ss"
    Write-Host "[$time] Deploy fullført!" -ForegroundColor Green
}

Register-ObjectEvent $watcher "Changed" -Action $deploy | Out-Null
Register-ObjectEvent $watcher "Created" -Action $deploy | Out-Null

try {
    while ($true) { Wait-Event -Timeout 1 }
} finally {
    $watcher.Dispose()
}
