import { VehicleInstance, VehicleCatalog } from "../models/Car.js";
import type { Response } from "express";

// Get all available cars (Public)
export const getCatalog = async (req: any, res: any) => {
  try {
    // This query finds all models and checks how many units are 'available'
    const catalog = await VehicleCatalog.aggregate([
      {
        $lookup: {
          from: "vehicleinstances", // The collection name for VehicleInstance
          localField: "_id",
          foreignField: "catalogItem",
          as: "inventory",
        },
      },
      // Add this stage to your existing aggregate in getCatalog
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "vehicleCatalog",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
          totalReviews: { $size: "$reviews" },
        },
      },
      {
        $project: {
          make: 1,
          model: 1,
          basePricePerDay: 1,
          capacity: 1,
          availableCount: {
            $size: {
              $filter: {
                input: "$inventory",
                as: "item",
                cond: { $eq: ["$$item.status", "available"] },
              },
            },
          },
        },
      },
    ]);
    res.status(200).json(catalog);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching catalog", error: error.message });
  }
};

// @desc    Add a new car model to the catalog
// @route   POST /api/cars/catalog
// @access  Admin Only
export const addToCatalog = async (req: any, res: any) => {
  try {
    const {
      make,
      model,
      year,
      capacity,
      fuelType,
      transmission,
      basePricePerDay,
      description,
      images,
    } = req.body;

    // Check if this model already exists to avoid duplicates
    const existingModel = await VehicleCatalog.findOne({ make, model, year });
    if (existingModel) {
      return res
        .status(400)
        .json({ message: "This car model already exists in the catalog." });
    }

    const newCatalogItem = await VehicleCatalog.create({
      make,
      model,
      year,
      capacity,
      fuelType,
      transmission,
      basePricePerDay,
      description,
      images,
    });

    res.status(201).json({
      success: true,
      message: "New model added to catalog successfully",
      data: newCatalogItem,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error adding to catalog", error: error.message });
  }
};

export const addCarInstance = async (req: any, res: Response) => {
  try {
    const {
      catalogId, // You now need to link it to a Catalog ID
      registrationNumber,
      color,
      currentLocation,
    } = req.body;

    const newInstance = await VehicleInstance.create({
      catalogItem: catalogId,
      registrationNumber,
      color,
      currentLocation,
      owner: req.user?.id,
      status: "available",
    });

    res.status(201).json(newInstance);
  } catch (error) {
    res.status(400).json({ message: "Error adding vehicle unit", error });
  }
};

export const deleteCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // 1. Find the car first to check ownership
    const car = await VehicleInstance.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // 2. Authorization Check: Admin can delete anything, Sellers only their own cars
    // req.user.id comes from your 'protect' middleware
    if (req.user.role !== "admin" && car.owner?.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this car" });
    }

    // 3. Perform Soft Delete (Recommended)
    // This keeps the record but hides it from 'getAllCars'
    car.status = "unavailable";
    // You could also add a field like 'isDeleted: true' if you want to keep 'isAvailable' for rentals
    await car.save();

    /* // OR: Perform Hard Delete
    await Car.findByIdAndDelete(id); 
    */

    res.status(200).json({
      status: "success",
      message: "Car has been successfully removed from the listings.",
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting car", error: error.message });
  }
};

export const updateCar = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    // 1. Find the car
    let car = await VehicleInstance.findById(id);

    console.log("1. ID from Params:", req.params.id);
    console.log("2. Body from Request:", req.body); // Check if pricePerDay is here

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // 2. Authorization Check (Admin or Owner)
    if (req.user.role !== "admin" && car.owner?.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this car" });
    }

    // 3. Update the car
    // new: true returns the updated document instead of the old one
    // runValidators: true ensures the update follows your Schema rules
    car = await VehicleInstance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Car details updated successfully",
      data: car,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error updating car", error: error.message });
  }
};
// Get a single car by ID
export const getCarById = async (req: any, res: any) => {
  try {
    const car = await VehicleCatalog.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching car", error: error.message });
  }
};
