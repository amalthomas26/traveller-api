import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";

import logger from "./utils/logger";
import healthRoutes from "./routes/health";
import tripRoutes from "./routes/trip";

import ApiError from "./utils/ApiError";
import errorHandler from "./middlewares/errorHandler";



const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

app.use(
  morgan("combined", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);



app.use("/api/health", healthRoutes);

app.use("/api/trips", tripRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "API Running" });
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Route ${req.originalUrl} not found`, 404));
});



app.use(errorHandler);



export default app;
