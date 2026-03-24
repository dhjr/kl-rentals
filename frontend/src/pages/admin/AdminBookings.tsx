import { useState, useEffect } from "react";
import { Calendar, Loader2, Search, ArrowLeft, User as UserIcon, Car, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Booking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  vehicleInstance: {
    _id: string;
    registrationNumber: string;
    catalogItem: {
      make: string;
      model: string;
    };
  };
  createdAt: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return <CheckCircle size={14} className="text-emerald-500" />;
      case "pending":
        return <Clock size={14} className="text-amber-500" />;
      case "cancelled":
        return <XCircle size={14} className="text-red-500" />;
      default:
        return <AlertCircle size={14} className="text-slate-400" />;
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.vehicleInstance?.catalogItem?.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.vehicleInstance?.catalogItem?.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.vehicleInstance?.registrationNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/admin/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6">
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All Bookings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor all rental transactions and statuses
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search user, car, or Reg No..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status & Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                        <UserIcon size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white capitalize text-sm">{booking.user.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{booking.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500">
                        <Car size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">
                          {booking.vehicleInstance?.catalogItem?.make || "Unknown"} {booking.vehicleInstance?.catalogItem?.model || "Car"}
                        </p>
                        <p className="text-[11px] font-mono font-bold text-slate-500 tracking-wider">
                          {booking.vehicleInstance?.registrationNumber || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                            <Calendar size={12} className="text-slate-400" />
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider w-fit ${
                            booking.status === "confirmed" 
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" 
                            : booking.status === "cancelled"
                            ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        }`}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                        </span>
                        <p className="text-sm font-extrabold text-slate-900 dark:text-white">₹{booking.totalPrice.toLocaleString()}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
            No bookings found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
