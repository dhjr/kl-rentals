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
      <h1 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">
        Available Cars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyCars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 group"
          >
            <div className="overflow-hidden">
              <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
                [Image Placeholder]
              </div>
            </div>
            <div className="p-5 grow flex flex-col justify-between z-10 bg-white">
              <div>
                <h2 className="text-xl font-bold mb-1 text-slate-900">
                  {car.name}
                </h2>
                <div className="flex justify-between text-sm text-slate-500 mb-4 font-medium">
                  <span>{car.type}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-900">
                  ${car.price}
                  <span className="text-sm text-slate-500 font-medium ml-1">
                    / day
                  </span>
                </span>
                <Link
                  to={`/cars/${car.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors"
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
