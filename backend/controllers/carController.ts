import type { Response } from "express";
import Car from "../models/Car.js";

// Get all available cars (Public)
export const getAllCars = async (req: any, res: Response) => {
  try {
    const cars = await Car.find({ available: true });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars" });
  }
};

// Add a new car (Admin/Seller Only)
export const addCar = async (req: any, res: Response) => {
  try {
    // 1. Destructure using the field names defined in your Schema
    const {
      make,
      carModel,
      year,
      pricePerDay,
      capacity,
      transmission,
      fuelType,
      location,
    } = req.body;

    const newCar = await Car.create({
      make,
      carModel,
      year,
      pricePerDay,
      capacity,
      transmission,
      fuelType,
      location,
      owner: req.user?.id, // Changed from 'seller' to 'owner'
    });

    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: "Error adding car", error });
  }
};

export const deleteCar = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // 1. Find the car first to check ownership
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // 2. Authorization Check: Admin can delete anything, Sellers only their own cars
    // req.user.id comes from your 'protect' middleware
    if (req.user.role !== "admin" && car.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this car" });
    }

    // 3. Perform Soft Delete (Recommended)
    // This keeps the record but hides it from 'getAllCars'
    car.available = false;
    // You could also add a field like 'isDeleted: true' if you want to keep 'isAvailable' for rentals
    await car.save();

    /* // OR: Perform Hard Delete
    await Car.findByIdAndDelete(id); 
    */

    res.status(200).json({
      status: "success",
      message: "Car has been successfully removed from the listings.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting car", error: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the car
    let car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // 2. Authorization Check (Admin or Owner)
    if (req.user.role !== "admin" && car.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this car" });
    }

    // 3. Update the car
    // new: true returns the updated document instead of the old one
    // runValidators: true ensures the update follows your Schema rules
    car = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Car details updated successfully",
      data: car,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating car", error: error.message });
  }
};
