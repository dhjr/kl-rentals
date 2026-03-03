import { Link } from "react-router-dom";
import { Car } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          <Car className="h-6 w-6" />
          <span>KL Rentals</span>
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/bookings" className="text-gray-600 hover:text-blue-600">
            My Bookings
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
