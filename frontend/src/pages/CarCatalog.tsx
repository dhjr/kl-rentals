import { useState } from "react";
import { CarCard } from "../components/feature/CarCard";
import { Button } from "../components/ui/Button";
import { Filter } from "lucide-react";
import { cn } from "../lib/utils";

// Mock data extension
const CARS_DATA = Array.from({ length: 9 }).map((_, i) => ({
  id: `c-${i}`,
  name: i % 2 === 0 ? "Tesla Model 3" : "Ford Mustang",
  type: i % 2 === 0 ? "Electric" : "Sport",
  image:
    i % 2 === 0
      ? "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1580273916550-e323be2eb5fa?q=80&w=800&auto=format&fit=crop",
  capacity: 4,
  transmission: "Automatic",
  fuelCapacity: i % 2 === 0 ? 100 : 60,
  price: 80 + i * 10,
  discountPrice: i % 3 === 0 ? 100 + i * 10 : undefined,
}));

export function CarCatalog() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside
          className={cn(
            "lg:w-64 flex-none space-y-8",
            isFilterOpen ? "block" : "hidden lg:block",
            "fixed inset-0 z-40 bg-background p-6 lg:static lg:p-0 lg:bg-transparent",
          )}
        >
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFilterOpen(false)}
            >
              <span className="sr-only">Close</span>✕
            </Button>
          </div>

          {/* Type Filter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Type
            </h3>
            <div className="space-y-2">
              {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map(
                (type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-input text-primary focus:ring-primary"
                    />
                    <span>{type}</span>
                    <span className="ml-auto text-muted-foreground text-xs">
                      (10)
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Capacity Filter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Capacity
            </h3>
            <div className="space-y-2">
              {["2 Person", "4 Person", "6 Person", "8 or More"].map((cap) => (
                <label key={cap} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>{cap}</span>
                  <span className="ml-auto text-muted-foreground text-xs">
                    (8)
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Price
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-primary"
              />
              <div className="text-sm font-medium">Max. $100.00</div>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile filter */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full sm:w-96">
              {/* Re-use search logic concept or placeholder */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="lg:hidden gap-2"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="bg-transparent text-sm font-medium focus:outline-none">
                <option>Recommended</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARS_DATA.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="secondary">
              Show More Car
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
