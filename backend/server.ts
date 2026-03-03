import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
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
app.use("/api/car", carRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
