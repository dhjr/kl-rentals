import type { Request, Response } from "express";
import User from "../models/User.js";
import { VehicleCatalog, VehicleInstance } from "../models/Car.js";
import Booking from "../models/Booking.js";

// @desc    Get admin dashboard stats
// @route   GET /api/v1/admin/stats
// @access  Private/Admin
export const getStats = async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    const carCount = await VehicleInstance.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.status(200).json({
      users: userCount,
      cars: carCount,
      bookings: bookingCount,
      revenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private/Admin
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.role = role;
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
          return res.status(400).json({ message: "Cannot delete an admin user" });
      }
      await user.deleteOne();
      res.status(200).json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all cars (instances)
// @route   GET /api/v1/admin/cars
// @access  Private/Admin
export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await VehicleInstance.find({})
      .populate("catalogItem")
      .populate("owner", "name email");
    res.status(200).json(cars);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete car
// @route   DELETE /api/v1/admin/cars/:id
// @access  Private/Admin
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await VehicleInstance.findById(req.params.id);

    if (car) {
      await car.deleteOne();
      res.status(200).json({ message: "Car removed" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/v1/admin/bookings
// @access  Private/Admin
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({})
      .populate({
        path: "vehicleInstance",
        populate: { path: "catalogItem" }
      })
      .populate("user", "name email");
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
