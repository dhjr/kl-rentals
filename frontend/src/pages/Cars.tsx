import { Link } from "react-router-dom";

const Cars = () => {
  // Dummy data for basic layout
  const dummyCars = [
    { id: 1, name: "Tesla Model 3", type: "Electric", price: 80 },
    { id: 2, name: "Toyota Camry", type: "Sedan", price: 45 },
    { id: 3, name: "Ford Mustang", type: "Sports", price: 120 },
    { id: 4, name: "Honda CR-V", type: "SUV", price: 65 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Available Cars</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyCars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
              [Image Placeholder]
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">{car.name}</h2>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{car.type}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-blue-600">
                  ${car.price}
                  <span className="text-sm text-gray-500 font-normal">
                    /day
                  </span>
                </span>
                <Link
                  to={`/cars/${car.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
