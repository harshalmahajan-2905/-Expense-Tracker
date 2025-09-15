import "dotenv/config";
import express from "express";
import cors from "cors";
import expensesRouter from "./routes/expenses";
import { connectDB } from "./config/db";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Connect database (non-blocking; logs error if fails)
  connectDB().catch((err) => console.error("DB init error", err));

  // Healthcheck & example
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Expense API
  app.use("/api/expenses", expensesRouter);

  // Error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal Server Error" });
  });

  return app;
}

export default createServer;
