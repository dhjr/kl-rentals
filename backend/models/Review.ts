import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  vehicleCatalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleCatalog",
    required: [true, "Review must belong to a car model."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user."],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide a rating between 1 and 5."],
  },
  review: {
    type: String,
    required: [true, "Review text cannot be empty."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate reviews: One user can only review a model once
reviewSchema.index({ vehicleCatalog: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
