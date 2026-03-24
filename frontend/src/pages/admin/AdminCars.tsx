import { useState, useEffect } from "react";
import { Car, Trash2, Loader2, Search, ArrowLeft, User as UserIcon, ShieldCheck, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

interface VehicleInstance {
  _id: string;
  registrationNumber: string;
  color: string;
  status: string;
  owner?: {
    _id: string;
    name: string;
    email: string;
  };
  catalogItem: {
    _id: string;
    make: string;
    model: string;
    year: number;
    basePricePerDay: number;
    images: string[];
  };
}

const AdminCars = () => {
  const [cars, setCars] = useState<VehicleInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/admin/cars`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setCars(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    if (!window.confirm("Are you sure you want to remove this vehicle from the platform?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/admin/cars/${carId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete car");
      }

      setCars(cars.filter(c => c._id !== carId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredCars = cars.filter(car => 
    car.catalogItem?.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.catalogItem?.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.registrationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (car.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Fleet Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Oversee all vehicles across the platform
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search make, model, owner or Reg No..."
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pricing</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCars.map((car) => (
                <tr key={car._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center text-slate-400">
                        {car.catalogItem.images && car.catalogItem.images.length > 0 ? (
                          <img src={car.catalogItem.images[0]} alt={car.catalogItem.model} className="w-full h-full object-cover" />
                        ) : (
                          <Car size={24} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{car.catalogItem?.make || "Unknown"} {car.catalogItem?.model || "Car"}</p>
                        <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{car.registrationNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400">
                            <UserIcon size={14} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">{car.owner?.name || "System"}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{car.owner?.email || "N/A"}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      car.status === "available" 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                      : car.status === "rented"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
                    }`}>
                      {car.status === 'available' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                      {car.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">₹{car.catalogItem.basePricePerDay}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">per day</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                      title="Remove Vehicle"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCars.length === 0 && (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
            No vehicles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCars;
