import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Image as ImageIcon } from "lucide-react";

const AddCar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    capacity: 4,
    fuelType: "Petrol",
    transmission: "Automatic",
    basePricePerDay: 0,
    description: "",
    imageUrl: "",
    color: "",
    registrationNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "capacity" || name === "basePricePerDay"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Create the Catalog Item
      const catalogResponse = await fetch(
        "http://localhost:3000/api/car/catalog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            make: formData.make,
            model: formData.model,
            year: formData.year,
            capacity: formData.capacity,
            fuelType: formData.fuelType,
            transmission: formData.transmission,
            basePricePerDay: formData.basePricePerDay,
            description: formData.description,
            images: formData.imageUrl ? [formData.imageUrl] : [],
          }),
        },
      );

      const catalogData = await catalogResponse.json();

      let catalogId;

      if (!catalogResponse.ok) {
        if (
          catalogData.message ===
          "This car model already exists in the catalog."
        ) {
          // In a real app, we might want to query for the existing ID
          // For this simple version, we'll just fail and tell them to use a unique model name
          throw new Error(
            "This Make/Model/Year combination already exists. Please create a unique listing for now.",
          );
        } else {
          throw new Error(
            catalogData.message || "Failed to create catalog listing",
          );
        }
      } else {
        catalogId = catalogData.data._id;
      }

      // Step 2: Create the Vehicle Instance assigned to this seller
      const instanceResponse = await fetch(
        "http://localhost:3000/api/car/inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            catalogId,
            registrationNumber: formData.registrationNumber,
            color: formData.color,
            currentLocation: "Seller Location", // Hardcoded for simplicity now
          }),
        },
      );

      const instanceData = await instanceResponse.json();

      if (!instanceResponse.ok) {
        throw new Error(
          instanceData.message || "Failed to add specific vehicle to inventory",
        );
      }

      // Success! Redirect to dashboard
      navigate("/seller-dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/seller-dashboard"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          List a New Vehicle
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Fill in the details below to add a car to your rental fleet.
        </p>
      </div>

      {error && (
        <div className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Details Section */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            General Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Make (Brand)
              </label>
              <input
                required
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g. Honda"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Model
              </label>
              <input
                required
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. Civic"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Year
              </label>
              <input
                required
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1990"
                max={new Date().getFullYear() + 1}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Capacity (Seats)
              </label>
              <input
                required
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="2"
                max="15"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            Specifications & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white appearance-none"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white appearance-none"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Base Price Per Day (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  ₹
                </span>
                <input
                  required
                  type="number"
                  name="basePricePerDay"
                  value={formData.basePricePerDay}
                  onChange={handleChange}
                  min="0"
                  step="10"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Image URL
              </label>
              <div className="relative">
                <ImageIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  required
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell renters about this vehicle..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white resize-none"
            ></textarea>
          </div>
        </div>

        {/* Specific Unit Details Section */}
        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 sm:p-8 rounded-3xl border border-blue-100 dark:border-blue-800/30">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-6 border-b border-blue-200 dark:border-blue-800/50 pb-4">
            Specific Unit Details
          </h2>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-6 font-medium">
            We need specific identifiers for the precise vehicle you are listing
            today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-blue-900 dark:text-blue-200 mb-1.5">
                Registration Number
              </label>
              <input
                required
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="e.g. MH 12 AB 1234"
                className="w-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-blue-900 dark:text-blue-200 mb-1.5">
                Color
              </label>
              <input
                required
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Metallic Blue"
                className="w-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
              />
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
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
              </>
            ) : (
              "Publish Listing"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
