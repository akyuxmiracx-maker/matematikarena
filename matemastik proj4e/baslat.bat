@echo off
chcp 65001 >nul
title MatematikArena
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (set "RUN=py") else (set "RUN=python")

echo.
echo   MatematikArena baslatiliyor...
echo   Adres: http://localhost:8765
echo   Kapatmak icin bu pencereyi kapatin.
echo.

start "MatematikArena sunucu" /b %RUN% -m http.server 8765 --bind 127.0.0.1
timeout /t 1 /nobreak >nul
start "" "http://localhost:8765/"

pause
