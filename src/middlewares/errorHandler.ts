import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

interface ErrorResponse {
  message: string;
  details: unknown | null;
  stack?: string;
}

export default function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.statusCode || 500;

  const response: ErrorResponse = {
    message: err.message || "Something went wrong",
    details: err.details || null,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(status).json(response);
}
