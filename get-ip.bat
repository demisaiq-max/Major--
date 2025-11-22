@echo off
echo.
echo ========================================
echo   Your Computer's IP Address
echo ========================================
echo.
ipconfig | findstr /i "IPv4"
echo.
echo ========================================
echo   Instructions
echo ========================================
echo.
echo 1. Find your WiFi adapter's IPv4 Address
echo    (Usually starts with 192.168.x.x or 10.0.x.x)
echo.
echo 2. Update .env file:
echo    EXPO_PUBLIC_RORK_API_BASE_URL=http://YOUR_IP:3000
echo.
echo 3. Restart backend if already running
echo.
pause

