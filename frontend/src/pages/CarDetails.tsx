import { useParams } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { Button } from "../components/ui/Button";
import { CarCard } from "../components/feature/CarCard";

// Mock Data
const MOCK_CAR = {
  id: "1",
  name: "Nissan GT - R",
  type: "Sport",
  description:
    "NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the race track.",
  images: [
    "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2eb5fa?q=80&w=800&auto=format&fit=crop",
  ],
  capacity: 2,
  transmission: "Manual",
  fuelCapacity: 70,
  price: 80.0,
  discountPrice: 100.0,
  reviews: [
    {
      name: "Alex Stanton",
      role: "CEO at Bukalapak",
      date: "21 July 2022",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=alex",
      comment:
        "We are very happy with the service from the car rental application. More low price.",
    },
    {
      name: "Skylar Dias",
      role: "CEO at Amazon",
      date: "20 July 2022",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?u=skylar",
      comment:
        "I am greatly helped by the services of the car rental application. More reliable.",
    },
  ],
};

export function CarDetails() {
  const { id } = useParams();
  console.log(id); // Temporary usage to avoid unused var error until real fetch
  // real implementation would fetch car by id
  const car = MOCK_CAR;

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-muted">
            <img
              src={car.images[0]}
              alt={car.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {car.images.map((img, i) => (
              <div
                key={i}
                className="aspect-4/3 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-colors"
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="bg-card rounded-xl p-6 border shadow-sm h-fit">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl font-bold">{car.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  440+ Reviews
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-destructive">
              <Heart className="h-6 w-6" />
            </Button>
          </div>

          <p className="text-muted-foreground leading-relaxed my-6">
            {car.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm mb-8">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type Car</span>
              <span className="font-semibold">{car.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-semibold">{car.capacity} Person</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Steering</span>
              <span className="font-semibold">{car.transmission}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gasoline</span>
              <span className="font-semibold">{car.fuelCapacity}L</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">
                  ${car.price.toFixed(2)}
                </span>
                <span className="text-muted-foreground">/ day</span>
              </div>
              {car.discountPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${car.discountPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button size="lg">Rent Now</Button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-card rounded-xl p-6 border shadow-sm mb-10">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold">Reviews</h2>
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            13
          </span>
        </div>

        <div className="space-y-6">
          {car.reviews.map((review, i) => (
            <div key={i} className="flex gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, r) => (
                        <Star
                          key={r}
                          className={cn(
                            "h-3 w-3",
                            r < review.rating ? "fill-current" : "text-muted",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="ghost">Show All</Button>
        </div>
      </div>

      {/* Recent Cars placeholder */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-muted-foreground font-semibold">Recent Car</h2>
          <Button variant="link">View All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[MOCK_CAR, MOCK_CAR, MOCK_CAR].map((c, i) => (
            <CarCard key={i} car={{ ...c, id: `${i}`, image: c.images[0] }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
