import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";

const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// Mount tRPC router at /api/trpc (matching the frontend's expectations)
app.use(
  "/api/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  })
);

// Health check endpoints
app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

app.get("/api", (c) => {
  return c.json({ status: "ok", message: "API is running at /api" });
});

app.get("/api/health", (c) => {
  return c.json({ 
    status: "ok", 
    message: "Backend API is healthy",
    endpoints: {
      trpc: "/api/trpc",
      health: "/api/health"
    }
  });
});

export default app;