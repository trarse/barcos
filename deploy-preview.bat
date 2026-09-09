@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==============================================
echo  Estribor - Despliegue a Netlify (preview)
echo ==============================================
echo.
echo Desplegando... el progreso se guarda en deploy-log.txt
echo (la ventana no mostrara texto durante unos minutos). NO la cierres.
echo.

set NETLIFY_AUTH_TOKEN=nfp_bvRPjkX2mUXZmz3ggsYJEwirWRbqmMk26a4e
call "%APPDATA%\npm\netlify.cmd" deploy --build > deploy-log.txt 2>&1

echo.
echo ==============================================
echo  TERMINADO. URL del preview (Draft URL):
echo ==============================================
findstr /C:"Draft URL" deploy-log.txt
echo.
echo (El log completo esta guardado en deploy-log.txt)
pause
