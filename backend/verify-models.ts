import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User";
import { Car } from "./models/Car";
import { Booking } from "./models/Booking";

dotenv.config();

const verifyModels = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Create a Test User
    const testUser = new User({
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "hashedpassword123",
      role: "Member",
    });
    await testUser.save();
    console.log("✅ User model works");

    // 2. Create a Test Car
    const testCar = new Car({
      make: "Toyota",
      model: "Camry",
      year: 2022,
      pricePerDay: 50,
      capacity: 5,
      transmission: "Automatic",
      fuelType: "Hybrid",
      owner: testUser._id,
      location: "Kuala Lumpur",
    });
    await testCar.save();
    console.log("✅ Car model works");

    // 3. Create a Test Booking
    const testBooking = new Booking({
      user: testUser._id,
      car: testCar._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // +1 day
      totalAmount: 50,
      status: "Pending",
    });
    await testBooking.save();
    console.log("✅ Booking model works");

    // Clean up
    await Booking.deleteOne({ _id: testBooking._id });
    await Car.deleteOne({ _id: testCar._id });
    await User.deleteOne({ _id: testUser._id });
    console.log("✅ Cleaned up test data");

    console.log("🎉 All models verified successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ verification failed:", error);
    process.exit(1);
  }
};

verifyModels();
