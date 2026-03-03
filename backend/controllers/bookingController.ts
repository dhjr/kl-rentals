import Booking from "../models/Booking.js";
import { VehicleInstance } from "../models/Car.js";

export const createBooking = async (req: any, res: any) => {
  try {
    const { instanceId, startDate, endDate } = req.body;

    // 1. Populate 'catalogItem' (matching your schema field name)
    const instance = (await VehicleInstance.findById(instanceId).populate(
      "catalogItem",
    )) as any;

    if (!instance) {
      return res.status(404).json({ message: "Vehicle unit not found" });
    }

    if (instance.status !== "available") {
      return res
        .status(400)
        .json({ message: "This car is currently not available" });
    }

    // 2. Date Calculation
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    // 3. Access 'basePricePerDay' from 'catalogItem'
    // Using instance.catalogItem instead of instance.catalog
    const pricePerDay = instance.catalogItem?.basePricePerDay;

    if (!pricePerDay) {
      return res
        .status(400)
        .json({ message: "Pricing data missing for this vehicle" });
    }

    const totalPrice = days * pricePerDay;

    // 4. Create the booking
    const newBooking = await Booking.create({
      vehicleInstance: instanceId,
      user: req.user.id,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
    });

    res.status(201).json({ success: true, data: newBooking });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const checkoutBooking = async (req: any, res: any) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "active";
    await booking.save();

    // Update the physical unit using the correct ID field from your schema
    await VehicleInstance.findByIdAndUpdate(booking.vehicleInstance, {
      status: "rented",
    });

    res.status(200).json({
      success: true,
      message: "Check-out successful! The vehicle is now marked as Rented.",
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
