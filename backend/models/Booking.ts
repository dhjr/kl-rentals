import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: [true, "A booking must belong to a car"],
  },
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
  totalPrice: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "active", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
