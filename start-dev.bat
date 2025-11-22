@echo off
echo.
echo ========================================
echo   Starting Study Planner App (Local)
echo ========================================
echo.
echo Installing dependencies...
call bun install
echo.
echo Starting backend and frontend...
echo.
call bun run dev:all

