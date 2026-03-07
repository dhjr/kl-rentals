import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Loader2,
  Car,
  Calendar as CalendarIcon,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { carService } from "../utils/api";
import type { VehicleCatalog } from "../types";

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [car, setCar] = useState<VehicleCatalog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { startDate, endDate, totalPrice, days } = location.state || {};

  useEffect(() => {
    // If user navigated here directly without location state, send them back
    if (!startDate || !endDate || !totalPrice) {
      navigate(`/cars/${id}`);
      return;
    }

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
  }, [id, startDate, endDate, totalPrice, navigate]);

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await carService.createCheckoutSession({
        catalogId: id!,
        startDate,
        endDate,
      });

      if (response && response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("Failed to receive checkout URL");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to initialize payment session. Please try again.",
      );
      setIsProcessing(false);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error && !isProcessing) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Link
          to={`/cars/${id}`}
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          &larr; Back to Car Details
        </Link>
        <div className="text-center py-20 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/50">
          <p className="text-red-500 dark:text-red-400 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!car) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to={`/cars/${id}`}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-2 font-medium mb-4"
        >
          &larr; Back to edit details
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Review and Confirm
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Verify your booking details before proceeding to payment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Reservation Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              Reservation Summary
            </h2>

            <div className="flex gap-4 items-center mb-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden shrink-0">
                {car.images && car.images.length > 0 ? (
                  <img
                    src={car.images[0]}
                    alt={car.model}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <Car className="text-slate-400" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {car.make} {car.model}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {car.transmission} • {car.fuelType}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Pick-up
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {formatDate(startDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Drop-off
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {formatDate(endDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck size={18} />
              <span>Free cancellation up to 24 hours before pick-up.</span>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-blue-100 dark:border-blue-900/30 transition-colors sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              Price Breakdown
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>
                  ₹{car.basePricePerDay} x {days} days
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Taxes & Fees</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  Included
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  Total Amount
                </span>
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {error && isProcessing && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-800">
                {error}
              </div>
            )}

            <button
              onClick={handleProceedToPayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting to secure checkout...
                </>
              ) : (
                <>
                  Proceed to Payment <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-emerald-500" />
              Secure payment processed via Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
