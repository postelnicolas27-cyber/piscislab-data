@echo off
set PORT=8000

echo =====================================
echo PiscisLab - Mini serveur local
echo =====================================
echo.

REM Lancer le serveur HTTP Python
start cmd /k python -m http.server %PORT%

REM Attendre 1 seconde que le serveur démarre
timeout /t 1 >nul

REM Ouvrir le navigateur par defaut
start http://localhost:%PORT%/

echo.
echo Serveur lance sur http://localhost:%PORT%/
echo Appuyez sur Ctrl+C dans la fenetre serveur pour arreter
