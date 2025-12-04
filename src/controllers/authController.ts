import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt,{SignOptions} from "jsonwebtoken";
import User from "../models/Users";
import ApiError from '../utils/ApiError'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"
const SALT_ROUNDS = 12;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) throw new ApiError("email already exists",409);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      name,
      email,
      password:hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ApiError("Invalid credentials",401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError("Invalid credentials",401);

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as SignOptions);

    res.json({ message: "login successful", token });
  } catch (error) {
    next(error);
  }
};
