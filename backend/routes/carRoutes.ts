import express from "express";
import {
  getCatalog,
  addToCatalog,
  addCarInstance,
  deleteCar,
  updateCar,
} from "../controllers/carController.js";
import { protect, authorize } from "../middleware/Authorization.js";

const router = express.Router();

// Public Route: Anyone can see cars
router.get("/get-cars", getCatalog);

// Protected Routes: Only logged-in Admins or Sellers can add/remove cars
router.post("/catalog", protect, authorize("seller", "admin"), addToCatalog);

router.post(
  "/inventory",
  protect,
  authorize("admin", "seller"),
  addCarInstance,
);
// Example for deleting:
router.delete("/delete-:id", protect, authorize("admin", "seller"), deleteCar);

router.patch("/update-:id", protect, authorize("admin", "seller"), updateCar);

export default router;
