import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Car, Edit2, Trash2, Loader2 } from "lucide-react";

interface VehicleInstance {
  _id: string;
  registrationNumber: string;
  color: string;
  status: string;
  catalogItem: {
    _id: string;
    make: string;
    model: string;
    year: number;
    basePricePerDay: number;
    images: string[];
  };
}

const SellerDashboard = () => {
  const [inventory, setInventory] = useState<VehicleInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to disable this vehicle? It will no longer appear in public listings.",
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/car/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to disable vehicle");
      }

      // Refresh the list
      fetchInventory();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/car/seller-inventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch inventory");
      }

      setInventory(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Seller Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your vehicle fleet and listings
          </p>
        </div>
        <Link
          to="/seller-dashboard/add-car"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all shrink-0"
        >
          <Plus size={20} />
          Add New Vehicle
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </div>
      ) : inventory.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-400">
            <Car size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Vehicles Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
            You haven't listed any vehicles yet. Start earning by adding your
            first car to the KL Rentals platform.
          </p>
          <Link
            to="/seller-dashboard/add-car"
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            <Plus size={20} />
            List a Vehicle Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.map((car) => (
            <div
              key={car._id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="h-48 bg-slate-100 dark:bg-slate-800 relative">
                {car.catalogItem.images && car.catalogItem.images.length > 0 ? (
                  <img
                    src={car.catalogItem.images[0]}
                    alt={car.catalogItem.model}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Car size={40} />
                  </div>
                )}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                    car.status === "available"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-slate-900/90 text-white"
                  }`}
                >
                  {car.status}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {car.catalogItem.make} {car.catalogItem.model}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {car.catalogItem.year} • {car.color}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                      ₹{car.catalogItem.basePricePerDay}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Per Day
                    </p>
                  </div>
                </div>

                <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Registration No.
                  </p>
                  <p className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300">
                    {car.registrationNumber}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <Trash2 size={16} /> Disable
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
