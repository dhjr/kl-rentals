import Booking from "../models/Booking.js";
import { VehicleInstance, VehicleCatalog } from "../models/Car.js";
import Stripe from "stripe";

let stripeInstance: Stripe | null = null;
const getStripe = () => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  }
  return stripeInstance;
};

export const getUserBookings = async (req: any, res: any) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: "vehicleInstance",
        populate: { path: "catalogItem" },
      })
      .sort("-createdAt");

    res.status(200).json({ success: true, data: bookings });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req: any, res: any) => {
  try {
    const { catalogId, startDate, endDate } = req.body;

    // 1. Find the catalog item to get pricing
    const catalogItem = await VehicleCatalog.findById(catalogId);
    if (!catalogItem) {
      return res.status(404).json({ message: "Vehicle model not found" });
    }

    // 2. Find an available instance for this catalog item
    const instance = await VehicleInstance.findOne({
      catalogItem: catalogId,
      status: "available",
    });

    if (!instance) {
      return res.status(400).json({
        message: "No units of this car model are currently available for rent.",
      });
    }

    // 3. Date Calculation
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    const totalPrice = days * catalogItem.basePricePerDay;

    // 4. Create the booking
    const newBooking = await Booking.create({
      vehicleInstance: instance._id,
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

export const createCheckoutSession = async (req: any, res: any) => {
  try {
    const { catalogId, startDate, endDate } = req.body;

    // 1. Find the catalog item to get pricing
    const catalogItem = await VehicleCatalog.findById(catalogId);
    if (!catalogItem) {
      return res.status(404).json({ message: "Vehicle model not found" });
    }

    // 2. Find an available instance for this catalog item
    const instance = await VehicleInstance.findOne({
      catalogItem: catalogId,
      status: "available",
    });

    if (!instance) {
      return res.status(400).json({
        message: "No units of this car model are currently available for rent.",
      });
    }

    // 3. Date Calculation
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    const totalPrice = days * catalogItem.basePricePerDay;

    // 4. Create the booking as pending
    const newBooking = await Booking.create({
      vehicleInstance: instance._id,
      user: req.user.id,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
    });

    // 5. Create Stripe Checkout Session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${catalogItem.make} ${catalogItem.model}`,
              description: `Booking from ${startDate} to ${endDate} (${days} days)`,
            },
            unit_amount: Math.round(totalPrice * 100), // convert to paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}&booking_id=${newBooking._id}`,
      cancel_url: `http://localhost:5173/payment-cancelled?booking_id=${newBooking._id}`,
      metadata: {
        bookingId: newBooking._id.toString(),
      },
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
};

export const confirmBookingPayment = async (req: any, res: any) => {
  try {
    const { session_id, booking_id } = req.body;

    if (!session_id || !booking_id) {
      return res
        .status(400)
        .json({ message: "Missing session_id or booking_id" });
    }

    // Retrieve the session from Stripe to verify payment status
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const booking = await Booking.findById(booking_id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.status !== "confirmed" && booking.status !== "active") {
        booking.status = "confirmed";
        await booking.save();
      }

      return res
        .status(200)
        .json({ success: true, message: "Payment confirmed!" });
    } else {
      return res.status(400).json({ message: "Payment not completed yet." });
    }
  } catch (error: any) {
    console.error("Stripe Confirmation Error:", error);
    res.status(500).json({ message: "Failed to confirm payment" });
  }
};

export const cancelBooking = async (req: any, res: any) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only allow cancelling pending bookings safely
    if (booking.status === "pending") {
      booking.status = "cancelled";
      await booking.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (error: any) {
    console.error("Cancellation Error:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};
