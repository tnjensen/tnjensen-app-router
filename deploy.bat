@echo off
echo === Deploy tnjensen.no ===
echo.

set VPS_HOST=46.250.220.244
set VPS_USER=tnjensen
set SSH_KEY=%USERPROFILE%\.ssh\id_ed25519
set REMOTE_DIR=/var/www/tnjensen.no

echo [1/4] Oppretter arkiv...
tar czf deploy.tar.gz --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".github" --exclude="deploy.tar.gz" .

echo [2/4] Laster opp til VPS...
scp -i %SSH_KEY% -o StrictHostKeyChecking=no deploy.tar.gz %VPS_USER%@%VPS_HOST%:/tmp/

echo [3/4] Pakker ut og bygger...
ssh -i %SSH_KEY% -o StrictHostKeyChecking=no %VPS_USER%@%VPS_HOST% "cd %REMOTE_DIR% && rm -rf * && tar xzf /tmp/deploy.tar.gz && rm /tmp/deploy.tar.gz && npm install --legacy-peer-deps && npm run build && (pm2 reload tnjensen-app || pm2 start npm --name tnjensen-app -- start) && pm2 save"

echo [4/4] Rydder opp...
del deploy.tar.gz

echo.
echo === Deploy fullført! ===
pause
