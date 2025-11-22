@echo off
echo.
echo ========================================
echo   Expo Go Mobile Development Setup
echo ========================================
echo.
echo STEP 1: Find your IP address
echo ========================================
echo.
ipconfig | findstr /i "IPv4"
echo.
echo Copy your WiFi adapter's IPv4 Address (usually 192.168.x.x or 10.0.x.x)
echo.
echo ========================================
echo STEP 2: Update .env file
echo ========================================
echo.
echo Open .env file and change:
echo   FROM: EXPO_PUBLIC_RORK_API_BASE_URL=http://localhost:3000
echo   TO:   EXPO_PUBLIC_RORK_API_BASE_URL=http://YOUR_IP:3000
echo.
echo (Replace YOUR_IP with the address from Step 1)
echo.
pause
echo.
echo ========================================
echo STEP 3: Starting Expo for Mobile
echo ========================================
echo.
echo A QR code will appear below.
echo Scan it with Expo Go app on your phone.
echo.
echo Make sure:
echo   - Backend is running in another terminal
echo   - Phone and computer are on same WiFi
echo   - Firewall allows port 3000
echo.
pause
echo.
call bun run dev

