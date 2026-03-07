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
  createBooking: async (bookingData: {
    catalogId: string;
    startDate: string;
    endDate: string;
  }): Promise<any> => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.post("/booking/book", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },
  createCheckoutSession: async (bookingData: {
    catalogId: string;
    startDate: string;
    endDate: string;
  }): Promise<{ url: string }> => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.post(
        "/booking/create-checkout-session",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  },
  confirmPayment: async (data: {
    session_id: string;
    booking_id: string;
  }): Promise<any> => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.post("/booking/confirm-payment", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw error;
    }
  },
  cancelBooking: async (bookingId: string): Promise<any> => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.patch(
        "/booking/cancel",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  },
};

export default apiClient;
