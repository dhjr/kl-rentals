import axios from "axios";
import type { VehicleCatalog } from "../types";

// The backend is running on port 3000 locally
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const carService = {
  getAllCars: async (): Promise<VehicleCatalog[]> => {
    try {
      // Endpoint is /api/car/get-cars
      const response = await apiClient.get("/car/get-cars");
      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    }
  },
  getCarById: async (id: string): Promise<VehicleCatalog> => {
    try {
      const response = await apiClient.get(`/car/get-car/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching car details:", error);
      throw error;
    }
  },
};

export default apiClient;
