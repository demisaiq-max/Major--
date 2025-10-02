#!/bin/bash

echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules
rm -f bun.lock

echo "📦 Installing dependencies with Bun..."
bun install

echo "✅ Dependencies reinstalled!"
echo "🚀 You can now run: bun start"
