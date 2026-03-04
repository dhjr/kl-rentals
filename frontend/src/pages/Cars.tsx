import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { carService } from "../utils/api";
import type { VehicleCatalog } from "../types";

const Cars = () => {
  const [cars, setCars] = useState<VehicleCatalog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getAllCars();
        setCars(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight transition-colors">
        Available Cars
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/50">
          <p className="text-red-500 dark:text-red-400 font-medium">{error}</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No cars available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 group"
            >
              <div className="overflow-hidden">
                <div className="h-48 bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                  {car.images && car.images.length > 0 ? (
                    <img
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 font-medium tracking-wider text-sm uppercase">
                      No Image Available
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 grow flex flex-col justify-between z-10 bg-white dark:bg-slate-900 transition-colors">
                <div>
                  <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">
                    {car.make} {car.model}
                  </h2>
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium transition-colors">
                    <span>
                      {car.year || "N/A"} • {car.transmission || "Auto"}
                    </span>
                    <span>{car.fuelType || "Petrol"}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    ₹{car.basePricePerDay}
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">
                      / day
                    </span>
                  </span>
                  <Link
                    to={`/cars/${car._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 shadow-sm transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;
