import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://klrentals.vercel.app",
      process.env.FRONTEND_URL || "https://klrentals.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
// dotenv.config(); (Moved to the top)
const port = process.env.PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("🚀 Connected to MongoDB successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("⚠️ MongoDB connection fault:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 MongoDB disconnected");
});

connectDB();

app.get("/", (req: any, res: any) => {
  res.send(`Server is working on port ${port}`);
});

// ... other middleware (cors, express.json)
app.use("/api/v1/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/car", carRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
