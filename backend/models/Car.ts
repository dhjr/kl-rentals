import mongoose, { Schema, Document } from "mongoose";

export interface ICar extends Document {
  make: string;
  carModel: string;
  year: number;
  pricePerDay: number;
  capacity: number;
  transmission: "Automatic" | "Manual";
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  owner: mongoose.Types.ObjectId;
  photos: string[];
  available: boolean;
  location: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    capacity: { type: Number, required: true },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    photos: [{ type: String }],
    available: { type: Boolean, default: true },
    location: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

export const Car = mongoose.model<ICar>("Car", CarSchema);
