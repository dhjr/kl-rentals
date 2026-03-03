import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  // Point to the specific physical car unit
  vehicleInstance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleInstance",
    required: [true, "A booking must be linked to a specific vehicle instance"],
  },
  // Point to the user renting it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A booking must belong to a user"],
  },
  startDate: {
    type: Date,
    required: [true, "A booking must have a start date"],
  },
  endDate: {
    type: Date,
    required: [true, "A booking must have an end date"],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "active", "completed", "cancelled"],
    default: "pending",
  },
  // Optional: Capture the location at the time of booking
  pickupLocation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
