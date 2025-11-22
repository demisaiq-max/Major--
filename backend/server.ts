import { serve } from '@hono/node-server';
import app from './hono';

const port = parseInt(process.env.PORT || '3000', 10);

console.log(`🚀 Starting backend server on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

console.log(`✅ Backend server running at http://localhost:${port}`);
console.log(`📡 tRPC API available at http://localhost:${port}/api/trpc`);

