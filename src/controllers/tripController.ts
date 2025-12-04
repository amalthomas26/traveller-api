import { Request, Response, NextFunction } from "express";
import Trip from "../models/Trip";
import ApiError from "../utils/ApiError";

// CREATE TRIP //

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, destination, startDate, endDate, activities } = req.body;

    if (!req.user) throw new ApiError("Unauthorized", 401);

    const trip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      activities,
      user: req.user.id,
    });

    await trip.save();

    res.status(201).json({ message: "Trip created successfully", trip });
  } catch (error) {
    next(error);
  }
};

// GET MY TRIPS //

export const getMyTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new ApiError("Unauthorized", 401);

    const trips = await Trip.find({ user: req.user.id });

    res.status(200).json({ trips });
  } catch (error) {
    next(error);
  }
};

// GET ALL TRIPS (Admin Only) //

export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new ApiError("Unauthorized", 401);
    if (req.user.role !== "admin") throw new ApiError("Forbidden", 403);

    const trips = await Trip.find().populate("user", "email");

    res.status(200).json({ trips });
  } catch (error) {
    next(error);
  }
};

// UPDATE TRIP //

export const updateTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const trip = await Trip.findById(id);
    if (!trip) throw new ApiError("Trip not found ", 404);

    if (!req.user || req.user.id !== trip.user.toString()) {
      throw new ApiError("Forbidden", 403);
    }

    Object.assign(trip, updates);
    await trip.save();

    res.status(200).json({ message: "Trip updated successfully", trip });
  } catch (error) {
    next(error);
  }
};

//DELETE TRIP //

export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);
    if (!trip) throw new ApiError("Trip not found", 404);

    if (!req.user || req.user.id !== trip.user.toString()) {
      throw new ApiError("Forbidden ", 403);
    }

    await trip.deleteOne();

    res.status(200).json({message:"Trip deleted successfully",id,})

  } catch (error) {
    next(error);
  }
};
