import mongoose from "mongoose";

// 1. VEHICLE CATALOG (The Specs)
const VehicleCatalogSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: Number,
  capacity: Number,
  fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"] },
  transmission: { type: String, enum: ["Manual", "Automatic"] },
  basePricePerDay: { type: Number, required: true },
  description: String,
  images: [String], // General images for the model
});

// 2. VEHICLE INVENTORY (The Actual Units)
const VehicleInstanceSchema = new mongoose.Schema({
  catalogItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleCatalog",
    required: true,
  },
  registrationNumber: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  currentLocation: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "rented", "maintenance"],
    default: "available",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const VehicleCatalog = mongoose.model(
  "VehicleCatalog",
  VehicleCatalogSchema,
);
export const VehicleInstance = mongoose.model(
  "VehicleInstance",
  VehicleInstanceSchema,
);
