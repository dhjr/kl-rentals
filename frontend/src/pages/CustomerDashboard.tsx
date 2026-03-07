import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Car, CalendarCheck, ShieldCheck, MapPin } from "lucide-react";

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 pb-12 transition-colors">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">
                Welcome back, {user?.name?.split(" ")[0]}!
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl transition-colors">
                Ready for your next journey? Find your perfect ride or manage
                your upcoming reservations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Action Card: Browse Cars */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Car className="text-blue-600 dark:text-blue-400 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
              Find a Vehicle
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors">
              Browse our premium collection of well-maintained cars. Filter by
              make, model, and availability to find your exact match.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all"
            >
              Browse Cars Now
            </Link>
          </div>

          {/* Action Card: My Bookings */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 group">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CalendarCheck className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
              My Bookings
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors">
              View your upcoming trips, manage active reservations, or review
              your complete rental history with KL Rentals.
            </p>
            <Link
              to="/bookings"
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-600/40 transition-all"
            >
              View My Bookings
            </Link>
          </div>
        </div>

        {/* Quick Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Fully Verified
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All vehicles are personally inspected for performance and
                safety.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Convenient Pickup
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Easy locations for key handoffs without the usual rental desk
                hassle.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Wide Selection
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                From economy to luxury, find exactly what you need for the road
                ahead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
