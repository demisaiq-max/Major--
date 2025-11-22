@echo off
echo.
echo ========================================
echo   Starting Backend Server
echo ========================================
echo.
echo Backend will run at: http://localhost:3000
echo tRPC API will be at: http://localhost:3000/api/trpc
echo.
call bun run backend:dev

