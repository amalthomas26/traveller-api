import mongoose, { Schema, Document } from "mongoose";

export interface ITrip extends Document {
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  activities?: string[];
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TripSchema = new Schema<ITrip>({
  title: { type: String, required: true },
  destination: { type: String, required: true },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  activities: [{ type: String }],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});


const Trip = mongoose.model<ITrip>("Trip", TripSchema);
export default Trip;
