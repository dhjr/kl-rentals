import { Link } from "react-router-dom";
import { Car } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
        >
          <Car className="h-6 w-6 text-blue-600" />
          <span>KL Rentals</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/bookings"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            My Bookings
          </Link>
          <div className="flex gap-3 ml-2">
            <Link
              to="/login"
              className="text-sm font-medium px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
