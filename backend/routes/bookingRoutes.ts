import express from "express";
import {
  createBooking,
  checkoutBooking,
  getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/Authorization.js";

const router = express.Router();

router.get("/my-bookings", protect, getUserBookings);
router.post("/book", protect, createBooking);
router.patch("/checkout/:id", protect, checkoutBooking); // 'id' is the Booking ID

export default router;
