import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Loader2,
  Car,
  Users,
  Settings,
  Fuel,
  Shield,
  Star,
} from "lucide-react";
import { carService } from "../utils/api";
import type { VehicleCatalog } from "../types";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<VehicleCatalog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-96 bg-slate-100 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
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

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {car.make} {car.model}
                </h1>
                <div className="flex flex-wrap gap-4 text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Users size={18} className="text-blue-500" /> {car.capacity}{" "}
                    Seats
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Settings size={18} className="text-blue-500" />{" "}
                    {car.transmission}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Fuel size={18} className="text-blue-500" /> {car.fuelType}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-800">
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

          <form className="space-y-4 mb-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Pick-up Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Return Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all mt-4 transform active:scale-[0.98]"
            >
              Book This Car
            </button>
          </form>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
            No charge yet. You'll confirm in the next step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
