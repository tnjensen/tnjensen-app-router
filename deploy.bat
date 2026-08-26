@echo off
echo === Deploy til VPS ===

set VPS_HOST=46.250.220.244
set VPS_USER=tnjensen
set SSH_KEY=C:\Users\thoma\.ssh\id_ed25519
set REMOTE_DIR=/var/www/tnjensen.no

echo [1/4] Sync filer...
rsync -avzr --delete ^
    --exclude=".git*" ^
    --exclude=".github*" ^
    --exclude="node_modules" ^
    --exclude=".next" ^
    -e "ssh -i %SSH_KEY%" ^
    ./ %VPS_USER%@%VPS_HOST%:%REMOTE_DIR%/

echo [2/4] Installer og bygg...
ssh -i %SSH_KEY% %VPS_USER%@%VPS_HOST% "cd %REMOTE_DIR% && npm install --legacy-peer-deps && npm run build"

echo [3/4] Start PM2...
ssh -i %SSH_KEY% %VPS_USER%@%VPS_HOST% "pm2 reload tnjensen-app || pm2 start npm --name tnjensen-app -- start"

echo [4/4] Lagre PM2...
ssh -i %SSH_KEY% %VPS_USER%@%VPS_HOST% "pm2 save"

echo === Deploy fullført! ===
pause
