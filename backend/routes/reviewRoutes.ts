import express from "express";
import {
  createReview,
  getCatalogReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/Authorization.js";

const router = express.Router();

// Public Route: Anyone can see reviews for a specific car model
router.get("/catalog/:catalogId", getCatalogReviews);

// Protected Route: Only logged-in users can post a review
router.post("/add-review", protect, createReview);

export default router;
