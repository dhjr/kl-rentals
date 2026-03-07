import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Car, TrendingUp, ShieldCheck, Banknote } from "lucide-react";

const SellerLanding = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 pb-12 transition-colors">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">
                Seller Hub, {user?.name?.split(" ")[0]}!
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl transition-colors">
                Manage your fleet, track earnings, and grow your rental business
                seamlessly on KL Rentals.
              </p>
            </div>

            <Link
              to="/seller-dashboard/add-car"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all shrink-0"
            >
              List a New Vehicle
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Action Card: Manage Fleet */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Car className="text-blue-600 dark:text-blue-400 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
              Manage Your Fleet
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors">
              View your listed vehicles, update registration details, or
              temporarily disable listings when cars are undergoing maintenance.
            </p>
            <Link
              to="/seller-dashboard"
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Action Card: Track Earnings */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 group">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
              Performance & Earnings
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors">
              Monitor your incoming bookings and track your revenue growth over
              time to maximize your fleet's profitability.
            </p>
            <button
              disabled
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-semibold rounded-xl cursor-not-allowed transition-all"
            >
              Coming Soon
            </button>
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
                Guaranteed Income
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All payments are pre-authorized securely through Stripe.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Full Control
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Update availability or remove cars anytime with the click of a
                button.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Low Platform Fees
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Keep more of what you earn with our competitive commission
                structure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLanding;
