import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";

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

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    registrationNumber: "",
    color: "",
    status: "",
  });

  const [carInfo, setCarInfo] = useState<VehicleInstance | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // We'll fetch from the seller inventory and filter locally for simplicity
        // in a real app, you'd have a GET /api/car/instance/:id route
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/car/seller-inventory`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch vehicle");
        }

        const exactCar = data.data.find(
          (car: VehicleInstance) => car._id === id,
        );

        if (!exactCar) {
          throw new Error(
            "Vehicle not found or you don't have permission to edit it.",
          );
        }

        setCarInfo(exactCar);
        setFormData({
          registrationNumber: exactCar.registrationNumber,
          color: exactCar.color,
          status: exactCar.status,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/car/update-${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update vehicle");
      }

      navigate("/seller-dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/seller-dashboard"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Edit Vehicle Details
        </h1>
        {carInfo && (
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Updating settings for:{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {carInfo.catalogItem.make} {carInfo.catalogItem.model} (
              {carInfo.catalogItem.year})
            </span>
          </p>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-2xl mb-6">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> Catalog details like Make, Model, and Base
              Price cannot be modified directly per-unit. Only the specific
              physical attributes of this unit can be updated.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              Specific Unit Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Registration Number
                </label>
                <input
                  required
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Color
                </label>
                <input
                  required
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Availability Status
                </label>
                <select
                  required
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable (Disabled)</option>
                  <option value="rented">Currently Rented</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/seller-dashboard"
              className="px-6 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditCar;
