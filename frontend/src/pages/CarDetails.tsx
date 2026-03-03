import { useParams, Link } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Cars
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-lg">
            [Large Image Placeholder for Car {id}]
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h1 className="text-3xl font-bold mb-2">Tesla Model 3</h1>
            <p className="text-gray-600 mb-6">Electric • 5 Seats • Automatic</p>

            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              A premium electric sedan offering excellent range, advanced
              technology, and a smooth, silent ride. Perfect for both city
              commuting and longer road trips.
            </p>

            <h2 className="text-xl font-semibold mb-3">Reviews</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800">John Smith</span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Amazing car, highly recommended!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col h-fit sticky top-6">
          <div className="text-2xl font-bold mb-4 border-b pb-4">
            $80{" "}
            <span className="text-base font-normal text-gray-500">/ day</span>
          </div>

          <form className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pick-up Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-700 transition-colors mt-4"
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
