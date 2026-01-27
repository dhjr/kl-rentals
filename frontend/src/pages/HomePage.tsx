import { ArrowRight, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { CarCard } from "../components/feature/CarCard";
import { Link } from "react-router-dom";

// Mock data for featured cars
const FEATURED_CARS = [
  {
    id: "1",
    name: "Koenigsegg",
    type: "Sport",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    capacity: 2,
    transmission: "Manual",
    fuelCapacity: 90,
    price: 99.0,
  },
  {
    id: "2",
    name: "Nissan GT - R",
    type: "Sport",
    image:
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800&auto=format&fit=crop",
    capacity: 2,
    transmission: "Automatic",
    fuelCapacity: 80,
    price: 80.0,
    discountPrice: 100.0,
  },
  {
    id: "3",
    name: "Rolls - Royce",
    type: "Sedan",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
    capacity: 4,
    transmission: "Manual",
    fuelCapacity: 70,
    price: 96.0,
  },
  {
    id: "4",
    name: "All New Rush",
    type: "SUV",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop",
    capacity: 6,
    transmission: "Manual",
    fuelCapacity: 70,
    price: 72.0,
    discountPrice: 80.0,
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  The Easy Way to Rent a Car
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Providing cheap car rental services and safe and comfortable
                  facilities.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button size="lg" className="w-full sm:w-auto">
                  Rent Car
                </Button>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
              {/* Placeholder for Hero Image - using a nice gradient/blob illustration or stock photo */}
              <img
                src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1000&auto=format&fit=crop"
                alt="Luxury Car"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Search Bar Floating - Visual only for now */}
          <div className="mx-auto max-w-4xl mt-12 p-4 bg-background/80 backdrop-blur-md border rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Locations</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Select your city"
                    className="w-full h-10 pl-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="flex items-end">
                <Button size="lg" className="w-full">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Background blobs for visual interest */}
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-primary/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/4" />
      </section>

      {/* Featured Cars */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Popular Cars</h2>
            <Link
              to="/cars"
              className="text-primary hover:underline font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_CARS.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Stats / Why Us */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-muted-foreground">Cars Available</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">10k+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
