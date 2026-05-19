import express, { Request, Response } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
// Removed Vite import
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import "dotenv/config";
import { registerRoutes } from "./presentation/routes.js";
import { setupGooglePassport } from "./presentation/routes/api/auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT || 5000);

const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

if (!isProd) {
  app.use((_req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
  });
}
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(passport.initialize());

setupGooglePassport();
registerRoutes(app);

if (isProd) {
  // In production, the backend might still serve static files if desired,
  // or it could just be an API. We'll leave it as an API.
  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Dev Studio API is running" });
  });
} else {
  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Dev Studio API is running (Dev)" });
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Dev Studio running on port ${PORT}`);
});
