import { Link } from "react-router-dom";
import { Users, Fuel, Gauge } from "lucide-react";
import { Button } from "../ui/Button";

interface CarProps {
  id: string;
  name: string;
  type: string;
  image: string;
  capacity: number;
  transmission: string;
  fuelCapacity: number;
  price: number;
  discountPrice?: number;
}

export function CarCard({ car }: { car: CarProps }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 p-4">
          {/* Favorite button placeholder */}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{car.name}</h3>
            <p className="text-sm text-muted-foreground">{car.type}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            <span>{car.fuelCapacity}L</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{car.capacity} People</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-xl">${car.price}</span>
              <span className="text-sm text-muted-foreground">/ day</span>
            </div>
            {car.discountPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${car.discountPrice}
              </span>
            )}
          </div>
          <Link to={`/cars/${car.id}`}>
            <Button size="sm">Rent Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
