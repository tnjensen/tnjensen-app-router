# Deploy til VPS
# Kjør fra repo-mappa: .\deploy.ps1

$VPS_HOST = "46.250.220.244"
$VPS_USER = "tnjensen"
$SSH_KEY = "C:\Users\thoma\.ssh\id_ed25519"
$REMOTE_DIR = "/var/www/tnjensen.no"

Write-Host "=== Deploy til VPS ===" -ForegroundColor Cyan

Write-Host "[1/4] Sync filer..." -ForegroundColor Yellow
rsync -avzr --delete `
    --exclude=".git*" `
    --exclude=".github*" `
    --exclude="node_modules" `
    --exclude=".next" `
    -e "ssh -i $SSH_KEY" `
    "./" "$VPS_USER@$VPS_HOST`:$REMOTE_DIR/"

Write-Host "[2/4] Installer og bygg..." -ForegroundColor Yellow
ssh -i $SSH_KEY "$VPS_USER@$VPS_HOST" "cd $REMOTE_DIR && npm install --legacy-peer-deps && npm run build"

Write-Host "[3/4] Start PM2..." -ForegroundColor Yellow
ssh -i $SSH_KEY "$VPS_USER@$VPS_HOST" "pm2 reload tnjensen-app || pm2 start npm --name tnjensen-app -- start"

Write-Host "[4/4] Lagre PM2..." -ForegroundColor Yellow
ssh -i $SSH_KEY "$VPS_USER@$VPS_HOST" "pm2 save"

Write-Host "=== Deploy fullført! ===" -ForegroundColor Green
