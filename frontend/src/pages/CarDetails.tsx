import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  Loader2,
  Car,
  Users,
  Settings,
  Fuel,
  Shield,
  Star,
  Calendar as CalendarIcon,
} from "lucide-react";
import { carService } from "../utils/api";
import type { VehicleCatalog } from "../types";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<VehicleCatalog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Date Range State
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (!id) return;
        const data = await carService.getCarById(id);
        setCar(data);
      } catch (err) {
        console.error("Failed to fetch car details:", err);
        setError("Failed to load vehicle details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const diffTime = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (days > 0) {
        setTotalPrice(days * car.basePricePerDay);
      } else {
        setTotalPrice(null);
      }
    } else {
      setTotalPrice(null);
    }
  }, [startDate, endDate, car]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      setBookingError("Please select a valid date range.");
      return;
    }

    if (!totalPrice || totalPrice <= 0) {
      setBookingError("Return date must be after pickup date.");
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      const response = await carService.createCheckoutSession({
        catalogId: id!,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      // Redirect to Stripe checkout page
      if (response && response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("Failed to receive checkout URL");
      }
    } catch (err: any) {
      setBookingError(
        err.response?.data?.message ||
          "Failed to process booking request. Please try again.",
      );
      setIsBooking(false);
    }
  };

  const onDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  if (isLoading) {
    // ... existing loader code ...
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <Link
          to="/cars"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          &larr; Back to Fleet
        </Link>
        <div className="text-center py-20 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/50">
          <p className="text-red-500 dark:text-red-400 font-medium">
            {error || "Car not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/cars"
        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-medium"
      >
        &larr; Back to Cars
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-64 sm:h-80 md:h-96 bg-slate-100 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
            {car.images && car.images.length > 0 ? (
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                <Car size={48} />
                <span className="font-medium text-sm">No Image Available</span>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {car.make} {car.model}
                </h1>
                <div className="flex flex-wrap gap-3 md:gap-4 text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Users size={16} className="text-blue-500" /> {car.capacity}{" "}
                    Seats
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Settings size={16} className="text-blue-500" />{" "}
                    {car.transmission}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Fuel size={16} className="text-blue-500" /> {car.fuelType}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-800 shrink-0">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="text-amber-700 dark:text-amber-400 font-bold">
                  4.8
                </span>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 mt-8 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Description
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-lg">
              {car.description ||
                "No description available for this vehicle model yet."}
            </p>

            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Features
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "Full Insurance",
                "Roadside Assistance",
                "Clean Interior",
                "GPS Navigation",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <Shield size={16} className="text-emerald-500" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col h-fit sticky top-24 transition-colors">
          <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-6 text-slate-900 dark:text-white transition-colors">
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Price per day
            </div>
            <div className="text-4xl font-extrabold">
              ₹{car.basePricePerDay}{" "}
              <span className="text-lg font-medium text-slate-500 dark:text-slate-400 tracking-normal">
                / day
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Select Rental Period
              </label>
              <div className="relative">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={onDateChange}
                  minDate={new Date()}
                  placeholderText="Click to select dates"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl px-10 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold cursor-pointer"
                />
                <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5 pointer-events-none" />
              </div>
            </div>

            {totalPrice !== null && startDate && endDate && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 transition-all animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Total Duration
                  </span>
                  <span className="text-blue-800 dark:text-blue-200 font-bold">
                    {Math.ceil(
                      (endDate.getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    Days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Total Price
                  </span>
                  <span className="text-blue-800 dark:text-blue-200 text-xl font-black">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            )}

            {bookingError && (
              <p className="text-red-500 text-sm font-medium mt-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800/50">
                {bookingError}
              </p>
            )}

            <button
              type="button"
              onClick={handleBooking}
              disabled={isBooking}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all mt-6 transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Book This Car"
              )}
            </button>
          </div>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
            No charge yet. You'll confirm in the next step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
