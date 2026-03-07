import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface BookingData {
  _id: string;
  vehicleInstance: {
    catalogItem: {
      brand: string;
      model: string;
    };
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/booking/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token]);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "active":
        return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
      case "pending":
        return "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400";
      case "completed":
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
      case "cancelled":
        return "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight transition-colors">
        My Bookings
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm italic">
          Error: {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        {bookings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              You don't have any bookings yet.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
                    <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-xs">
                      Car
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-xs">
                      Dates
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-xs">
                      Total Price
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide text-xs">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">
                        {booking.vehicleInstance?.catalogItem?.brand}{" "}
                        {booking.vehicleInstance?.catalogItem?.model}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {formatDate(booking.startDate)} -{" "}
                        {formatDate(booking.endDate)}
                      </td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">
                        ₹{booking.totalPrice}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${getStatusStyle(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {bookings.map((booking) => (
                <div key={booking._id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {booking.vehicleInstance?.catalogItem?.brand}{" "}
                        {booking.vehicleInstance?.catalogItem?.model}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(booking.startDate)} -{" "}
                        {formatDate(booking.endDate)}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${getStatusStyle(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-800/50">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Total Amount
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{booking.totalPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
