import serverless from "serverless-http";
import dotenv from "dotenv";

// Load environment variables - try Netlify-specific first, then production
try {
  dotenv.config({ path: ".env.netlify" });
} catch (error) {
  console.warn("Could not load .env.netlify, falling back to .env.production");
  dotenv.config({ path: ".env.production" });
}

import { createServer } from "../../server";

// Create Express app and wrap with serverless handler
const app = createServer();
export const handler = serverless(app);
