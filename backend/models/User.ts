import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: "Member" | "Dealer" | "Admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["Member", "Dealer", "Admin"],
      default: "Member",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
