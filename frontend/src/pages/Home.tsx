import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  Star,
  Loader2,
} from "lucide-react";
import { carService } from "../utils/api";
import type { VehicleCatalog } from "../types";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [featuredCars, setFeaturedCars] = useState<VehicleCatalog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getAllCars();
        // Take the first 3 cars as featured
        setFeaturedCars(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        console.error("Failed to fetch featured cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[500px] flex items-center shadow-2xl">
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3")',
          }}
        ></div>

        <div className="relative z-20 p-6 md:p-16 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30 backdrop-blur-sm">
            <Star className="w-4 h-4" />
            <span>Top Rated Rental Service</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Drive Your <span className="text-blue-500">Dream</span> Today
          </h1>
          <p className="text-base md:text-xl text-slate-300 mb-8 font-medium leading-relaxed">
            Experience luxury, comfort, and reliability with our premium fleet
            of vehicles. Whether for business or leisure, we have the perfect
            ride for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-600/20 ring-1 ring-blue-500/50"
            >
              Browse Fleet
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-md border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose KL Rentals?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            We provide the best cars with the best service in the industry. Your
            journey matters to us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Premium Insurance
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Every rental comes with comprehensive insurance coverage for your
              peace of mind on the road.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              24/7 Support
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Our dedicated customer service team is available around the clock
              to assist you with any needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Many Locations
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Pick up and drop off your vehicle at any of our convenient
              locations nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="px-4 py-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Featured Fleet
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Discover our most popular models
            </p>
          </div>
          <Link
            to="/cars"
            className="hidden sm:flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View all <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
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
                    <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">
                      {car.make} {car.model}
                    </h3>
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
                      className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">
              No cars available at the moment.
            </p>
          </div>
        )}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/cars"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            View All Cars
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-blue-600 dark:bg-blue-700 rounded-3xl p-10 md:p-14 text-center text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for your next trip?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust KL Rentals for
              their transportation needs. Book now and get 15% off your first
              rental.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              Create an Account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
