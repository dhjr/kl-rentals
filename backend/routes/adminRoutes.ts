import express from "express";
import {
  getStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllCars,
  deleteCar,
  getAllBookings
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/Authorization.js";

const router = express.Router();

// All admin routes are protected by both authentication and admin role authorization
router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);
router.get("/cars", getAllCars);
router.delete("/cars/:id", deleteCar);
router.get("/bookings", getAllBookings);

export default router;
