import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import {
  createTrip,
  getMyTrips,
  getAllTrips,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController";

const router = Router();

router.post("/", authenticate, createTrip);

router.get("/mine", authenticate, getMyTrips);

router.get("/all", authenticate, getAllTrips);

router.put("/:id", authenticate, updateTrip);

router.delete("/:id", authenticate, deleteTrip);

export default router;
