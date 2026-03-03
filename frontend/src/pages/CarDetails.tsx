import { useParams, Link } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/"
        className="text-slate-500 hover:text-slate-900 transition-colors mb-6 inline-flex items-center gap-2 font-medium"
      >
        &larr; Back to Cars
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-80 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-lg border border-slate-200">
            [Large Image Placeholder for Car {id}]
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 tracking-tight">
              Tesla Model 3
            </h1>
            <p className="text-slate-500 mb-8 font-medium">
              Electric • 5 Seats • Automatic
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">
              Description
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              A premium electric sedan offering excellent range, advanced
              technology, and a smooth, silent ride. Perfect for both city
              commuting and longer road trips.
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">Reviews</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-900">John Smith</span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-slate-600 text-sm mt-1">
                  Amazing car, highly recommended!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-fit sticky top-24">
          <div className="text-3xl font-bold mb-6 border-b border-slate-100 pb-6 text-slate-900">
            $80{" "}
            <span className="text-base font-medium text-slate-500">/ day</span>
          </div>

          <form className="space-y-4 mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Pick-up Date
              </label>
              <input
                type="date"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Return Date
              </label>
              <input
                type="date"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 shadow-sm transition-all mt-4"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
