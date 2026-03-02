import mongoose, { Schema } from "mongoose";

const CarSchema = new Schema(
  {
    make: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    capacity: { type: Number, required: true },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    photos: [{ type: String }],
    available: { type: Boolean, default: true },
    location: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

const Car = mongoose.model("Car", CarSchema);

export default Car;
