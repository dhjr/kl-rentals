import { useParams, Link } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/"
        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-medium"
      >
        &larr; Back to Cars
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-80 bg-slate-100 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-600 text-lg border border-slate-200 dark:border-slate-800 transition-colors">
            [Large Image Placeholder for Car {id}]
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white tracking-tight">
              Tesla Model 3
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
              Electric • 5 Seats • Automatic
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Description
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              A premium electric sedan offering excellent range, advanced
              technology, and a smooth, silent ride. Perfect for both city
              commuting and longer road trips.
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Reviews
            </h2>
            <div className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-900 dark:text-white">
                    John Smith
                  </span>
                  <span className="text-yellow-500 dark:text-yellow-400">
                    ★★★★★
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Amazing car, highly recommended!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-fit sticky top-24 transition-colors">
          <div className="text-3xl font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-6 text-slate-900 dark:text-white transition-colors">
            $80{" "}
            <span className="text-base font-medium text-slate-500 dark:text-slate-400">
              / day
            </span>
          </div>

          <form className="space-y-4 mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Pick-up Date
              </label>
              <input
                type="date"
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all scheme-light dark:scheme-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Return Date
              </label>
              <input
                type="date"
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all scheme-light dark:scheme-dark"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 shadow-sm transition-all mt-4"
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
