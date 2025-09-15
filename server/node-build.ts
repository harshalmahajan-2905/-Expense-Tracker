import path from "path";
import express from "express";
import fs from "fs";
import { createServer } from "./index";

const app = createServer();
const port = process.env.PORT || 10000; // Using port 10000 as specified in the Render logs

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
// Path is relative to the compiled file in server/dist/node-build.mjs
const distPath = path.resolve(__dirname, "../../dist/spa");

// Check if the SPA directory exists
if (fs.existsSync(distPath)) {
  console.log(`Found SPA assets at: ${distPath}`);
  // Serve static files
  app.use(express.static(distPath));
} else {
  console.warn(`SPA directory not found at: ${distPath}`);
}

// Add a root API endpoint
app.get("/api", (_req, res) => {
  res.json({ message: "API is running", endpoints: ["/api/ping", "/api/expenses"] });
});

// Handle React Router - serve index.html for all non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Frontend assets not found. Make sure to build the client application.");
  }
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
