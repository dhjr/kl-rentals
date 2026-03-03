import { Types, Document } from "mongoose";

// 1. Define the Catalog (The "Gold Standard" specs/pricing)
export interface IVehicleCatalog {
  _id: Types.ObjectId;
  brand: string;
  modelName: string;
  category: string; // e.g., Sedan, SUV
  basePricePerDay: number;
  transmission: "manual" | "automatic";
  fuelType: "petrol" | "diesel" | "electric";
}

// 2. Define the Instance (The physical car unit)
export interface IVehicleInstance extends Document {
  catalog: Types.ObjectId | IVehicleCatalog; // Can be ID or populated object
  registrationNumber: string;
  color: string;
  status: "available" | "rented" | "maintenance";
  currentLocation: string;
}

// 3. Define the Populated Type for the Controller
// This specifically tells TS that 'catalog' IS the IVehicleCatalog object
export type PopulatedVehicleInstance = Omit<IVehicleInstance, "catalog"> & {
  catalog: IVehicleCatalog;
};
