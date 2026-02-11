import express from "express";
import { protect, authorize } from "../middleware/authMiddleware";
const router = express.Router();

// Public route
router.get("/", someFUnc);

// Protected route: Only logged in ADMINS can add cars
router.post("/add", protect, authorize("admin"), addCar);

export default router;
