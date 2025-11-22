# Study Planner App - Setup & Running Guide

Complete guide for setting up and running the Study Planner app locally or on mobile devices.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
  - [Web Development](#web-development)
  - [Mobile Development (Expo Go)](#mobile-development-expo-go)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)

---

## Prerequisites

- **Bun** (v1.0+) - https://bun.sh/
- **Node.js** (v18+)
- **Supabase account** - https://supabase.com/
- **Mobile device** with Expo Go (for mobile testing)
  - iOS: https://apps.apple.com/app/expo-go/id982107779
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Major--
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

---

## Configuration

### 1. Environment Variables

Create a `.env` file in the root directory:

#### For Web Development:
```env
EXPO_PUBLIC_RORK_API_BASE_URL=http://localhost:3000
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

#### For Mobile Development:
```env
EXPO_PUBLIC_RORK_API_BASE_URL=http://YOUR_COMPUTER_IP:3000
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

**Get your Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the `URL` and `anon public` key

### 2. Find Your IP Address (for mobile)

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (e.g., 192.168.1.4)

**Mac/Linux:**
```bash
ifconfig
```

### 3. Configure Firewall (for mobile)

**Windows (Run PowerShell as Administrator):**
```powershell
New-NetFirewallRule -DisplayName "Expo Backend" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

**Mac:**
```bash
# Firewall usually allows local network by default
```

---

## Running the App

### Web Development

Perfect for desktop/browser development with hot-reload.

#### Option 1: Run Everything Together (Recommended)

```bash
bun run dev:all
```

This starts:
- Backend server at http://localhost:3000
- Frontend at http://localhost:8081

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
bun run backend:dev
```

**Terminal 2 - Frontend:**
```bash
bun run dev:web
```

#### Verify It's Working

1. **Backend**: Open http://localhost:3000
   - Should show: `{"status":"ok","message":"API is running"}`

2. **Frontend**: Open http://localhost:8081
   - Your app should load

3. **Console**: Press F12 in browser
   - Should see: `🔗 tRPC URL: http://localhost:3000/api/trpc`

---

### Mobile Development (Expo Go)

Test the app on your physical iOS or Android device.

#### Step 1: Update .env for Mobile

Replace `localhost` with your computer's IP address:

```env
EXPO_PUBLIC_RORK_API_BASE_URL=http://192.168.1.4:3000
```
☝️ Use YOUR actual IP from `ipconfig` command!

#### Step 2: Start Backend

**Terminal 1:**
```bash
bun run backend:dev
```

Wait for: `✅ Backend server running at http://localhost:3000`

#### Step 3: Start Expo

**Terminal 2:**
```bash
bun run dev
```

A **QR code** will appear in the terminal!

#### Step 4: Test Backend from Phone

Before scanning QR, open your phone's browser:
```
http://YOUR_IP:3000
```

Should show: `{"status":"ok","message":"API is running"}`

If this fails, check:
- ✅ Both devices on same WiFi
- ✅ Firewall allows port 3000
- ✅ Backend is running
- ✅ Correct IP in URL

#### Step 5: Scan QR Code

1. Open **Expo Go** app on your phone
2. Scan the QR code from Terminal 2
3. Wait for app to load (first load takes 1-2 min)

**iOS:** Use Camera app or Expo Go scanner
**Android:** Use "Scan QR Code" button in Expo Go

#### Reload App

After making code changes:
1. Shake your phone
2. Tap "Reload"

Or enable "Fast Refresh" for automatic reloads.

---

## Troubleshooting

### Issue: Network Errors on Mobile

**Error:** `❌ tRPC network error: http://localhost:3000/api/trpc/...`

**Solution:**
1. Update `.env` with your computer's IP (not localhost)
2. Restart both backend and frontend
3. Test backend from phone's browser first

### Issue: Cannot Connect from Phone

**Checklist:**
- [ ] Phone and computer on same WiFi network
- [ ] `.env` has IP address (not localhost)
- [ ] Firewall allows port 3000
- [ ] Backend is running (`bun run backend:dev`)
- [ ] No VPN active on either device

### Issue: QR Code Not Showing

**Solution:**
- Make sure you're running `bun run dev` (not `dev:web`)
- If still not showing, try: `bun run dev:android` or `bun run dev:ios`

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# Find and kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
EXPO_PUBLIC_RORK_API_BASE_URL=http://localhost:3001
```

### Issue: Module Not Found

**Solution:**
```bash
rm -rf node_modules
bun install
```

### Issue: 404 Errors in Console

This means the backend path is misconfigured. It should already be fixed, but verify:
- Backend mounts tRPC at `/api/trpc/*` (check `backend/hono.ts`)
- Frontend connects to `${baseUrl}/api/trpc` (check `lib/trpc.ts`)

---

## Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (Expo + React Native)        │
│  Port: 8081                             │
│  - React Native components              │
│  - Expo Router                          │
│  - tRPC client                          │
└──────────────┬──────────────────────────┘
               │
               │ HTTP/tRPC
               │
┌──────────────▼──────────────────────────┐
│  Backend (Hono + tRPC)                  │
│  Port: 3000                             │
│  - API routes at /api/trpc              │
│  - Business logic                       │
│  - Database operations                  │
└──────────────┬──────────────────────────┘
               │
               │ SQL
               │
┌──────────────▼──────────────────────────┐
│  Supabase (Cloud)                       │
│  - PostgreSQL database                  │
│  - Authentication                       │
│  - Real-time subscriptions              │
└─────────────────────────────────────────┘
```

### Tech Stack

- **Frontend**: Expo, React Native, React Native Web
- **Backend**: Hono.js (lightweight web framework)
- **API**: tRPC (type-safe API layer)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **State**: Zustand + React Query

---

## Available Commands

| Command | Description |
|---------|-------------|
| `bun run dev:all` | Run backend + frontend together (web) |
| `bun run backend:dev` | Run backend only (with hot-reload) |
| `bun run dev` | Start Expo (shows QR for mobile) |
| `bun run dev:web` | Start frontend for web only |
| `bun run dev:android` | Start Expo for Android |
| `bun run dev:ios` | Start Expo for iOS |
| `bun run lint` | Run ESLint |

---

## Quick Reference

### Switch Between Web and Mobile

**Web → Mobile:**
1. Update `.env`: Change `localhost` to your IP
2. Restart servers
3. Run `bun run dev`
4. Scan QR code

**Mobile → Web:**
1. Update `.env`: Change IP back to `localhost`
2. Restart servers
3. Run `bun run dev:web`
4. Open http://localhost:8081

### Health Check Endpoints

- `GET /` - Basic health check
- `GET /api/health` - Detailed health check with endpoints info
- `GET /api/trpc/<route>` - All tRPC routes

### Environment Detection

The app automatically detects if it's running on:
- **Server** (Node.js) - Uses in-memory storage
- **Client** (Browser/React Native) - Uses AsyncStorage

This prevents "window is not defined" errors on the backend.

---

## Database Setup

If you haven't set up your Supabase database:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration files in order:
   - `database-schema.sql`
   - `database-migration-*.sql`

---

## Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Verify all prerequisites are installed
3. Ensure `.env` is configured correctly
4. Check that firewall allows necessary ports
5. Make sure both devices are on same network (for mobile)

---

## Notes

- Backend uses Bun runtime for better performance
- Hot-reload is enabled for both frontend and backend
- CORS is enabled for local development
- Never commit your `.env` file (already in `.gitignore`)
- First mobile load may take 1-2 minutes
- Some corporate/school WiFi networks block device-to-device communication

---

**Happy coding!** 🚀

