import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

export const createBooking = async (req: any, res: any) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const car = await Car.findById(carId);

    if (!car || !car.available) {
      return res
        .status(400)
        .json({ message: "Car is currently not available for rent" });
    }

    // Calculate total price: (Days between dates) * pricePerDay
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0)
      return res
        .status(400)
        .json({ message: "End date must be after start date" });

    const totalPrice = days * car.pricePerDay;

    const newBooking = await Booking.create({
      car: carId,
      user: req.user.id, // From 'protect' middleware
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({ success: true, data: newBooking });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const checkoutBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // 1. Mark booking as 'active' (meaning the trip has started)
    booking.status = "active";
    await booking.save();

    // 2. Mark the car as NOT available for others to see/book
    await Car.findByIdAndUpdate(booking.car, { isAvailable: false });

    res.status(200).json({
      success: true,
      message: "Check-out successful! The car is now marked as Rented.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
