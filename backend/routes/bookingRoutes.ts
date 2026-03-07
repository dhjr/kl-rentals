import express from "express";
import {
  createBooking,
  checkoutBooking,
  getUserBookings,
  createCheckoutSession,
  confirmBookingPayment,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/Authorization.js";

const router = express.Router();

router.get("/my-bookings", protect, getUserBookings);
router.post("/book", protect, createBooking);
router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/confirm-payment", protect, confirmBookingPayment);
router.patch("/checkout/:id", protect, checkoutBooking); // 'id' is the Booking ID

export default router;
