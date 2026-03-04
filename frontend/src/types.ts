export interface VehicleCatalog {
  _id: string;
  make: string;
  model: string;
  year?: number;
  capacity?: number;
  fuelType?: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission?: "Manual" | "Automatic";
  basePricePerDay: number;
  description?: string;
  images: string[];
}

export interface VehicleInstance {
  _id: string;
  catalogItem: string | VehicleCatalog; // ObjectId or populated object
  registrationNumber: string;
  color: string;
  currentLocation: string;
  status: "available" | "rented" | "maintenance" | "unavailable";
  owner?: string;
}
