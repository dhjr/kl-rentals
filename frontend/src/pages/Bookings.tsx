const Bookings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h1>

      <div className="bg-white shadow rounded-lg border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 font-medium text-gray-600">Car</th>
              <th className="px-6 py-4 font-medium text-gray-600">Dates</th>
              <th className="px-6 py-4 font-medium text-gray-600">
                Total Price
              </th>
              <th className="px-6 py-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800 font-medium">
                Tesla Model 3
              </td>
              <td className="px-6 py-4 text-gray-600">
                Oct 10, 2026 - Oct 12, 2026
              </td>
              <td className="px-6 py-4 text-gray-800">$160</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Confirmed
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800 font-medium">
                Toyota Camry
              </td>
              <td className="px-6 py-4 text-gray-600">
                Sep 01, 2026 - Sep 03, 2026
              </td>
              <td className="px-6 py-4 text-gray-800">$90</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
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
