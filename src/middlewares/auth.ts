import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../../types/express/token";
import ApiError from '../utils/ApiError';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer")) {
    throw new ApiError("No token provided",401);
  }
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError("Invalid Token",401);
  }
};
