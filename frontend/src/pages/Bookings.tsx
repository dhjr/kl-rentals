const Bookings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight transition-colors">
        My Bookings
      </h1>

      <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
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
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">
                Tesla Model 3
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                Oct 10, 2026 - Oct 12, 2026
              </td>
              <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">
                $160
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wide">
                  Confirmed
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">
                Toyota Camry
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                Sep 01, 2026 - Sep 03, 2026
              </td>
              <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">
                $90
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full uppercase tracking-wide">
                  Completed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
