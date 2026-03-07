import Review from "../models/Review.js";

export const createReview = async (req: any, res: any) => {
  try {
    const { rating, review, catalogId } = req.body;

    const newReview = await Review.create({
      vehicleCatalog: catalogId,
      user: req.user.id,
      rating,
      review,
    });

    res.status(201).json({ success: true, data: newReview });
  } catch (error: any) {
    res.status(400).json({
      message: "You have already reviewed this car model.",
      error: error.message,
    });
  }
};

// Get all reviews for a specific car model
export const getCatalogReviews = async (req: any, res: any) => {
  try {
    const reviews = await Review.find({
      vehicleCatalog: req.params.catalogId,
    }).populate("user", "name"); // Show who wrote the review

    res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
