import mongoose, { Schema, Document } from "mongoose";
import { userInfo } from "os";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, trim: true },

  email: { type: String, required: true, unique: true, lowercase: true },

  password: {
    type: String,
    required: true,
    select: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
