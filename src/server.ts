import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import mongoose from "mongoose";
import logger from "./utils/logger";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  logger.error("MONGO_URI missing");
  process.exit(1);
}

(async () => {
  try {
    logger.info(`Connecting to MongoDB: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    logger.info("Connected to MongoDB");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("DB connection error", error);
    process.exit(1);
  }
})();

