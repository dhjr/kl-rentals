import mongoose from "mongoose";
import dotenv from "dotenv";
import { VehicleCatalog, VehicleInstance } from "./models/Car.js";

dotenv.config();

const indianCars = [
  {
    make: "Tata",
    model: "Nexon",
    year: 2024,
    capacity: 5,
    fuelType: "Electric",
    transmission: "Automatic",
    basePricePerDay: 2500,
    description:
      "The Tata Nexon EV is India's best-selling electric SUV, offering a blend of performance, technology, and a 5-star safety rating.",
    images: [
      "https://images.unsplash.com/photo-1621359983474-3c404cf90b45?auto=format&fit=crop&q=80&w=1000",
    ],
  },
  {
    make: "Mahindra",
    model: "XUV700",
    year: 2024,
    capacity: 7,
    fuelType: "Diesel",
    transmission: "Automatic",
    basePricePerDay: 3500,
    description:
      "The XUV700 is a premium SUV with advanced driver assistance systems (ADAS), a powerful engine, and a massive skyroof.",
    images: [
      "https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=1000",
    ],
  },
  {
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2024,
    capacity: 5,
    fuelType: "Petrol",
    transmission: "Manual",
    basePricePerDay: 1500,
    description:
      "The Maruti Swift is a cult icon in India, known for its sporty handling, fuel efficiency, and stylish looks.",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
    ],
  },
  {
    make: "Mahindra",
    model: "Thar",
    year: 2024,
    capacity: 4,
    fuelType: "Diesel",
    transmission: "Manual",
    basePricePerDay: 3000,
    description:
      "The Mahindra Thar is the ultimate off-roader for the Indian terrain, offering rugged build quality and go-anywhere capability.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
    ],
  },
  {
    make: "Hyundai",
    model: "Creta",
    year: 2024,
    capacity: 5,
    fuelType: "Petrol",
    transmission: "Automatic",
    basePricePerDay: 2800,
    description:
      "The Hyundai Creta is the quintessential family SUV in India, packed with features and a comfortable ride.",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000",
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB...");

    // Clear existing data (Optional: Remove if you want to keep existing)
    await VehicleCatalog.deleteMany({});
    await VehicleInstance.deleteMany({});
    console.log("Cleared existing car data.");

    for (const carData of indianCars) {
      const catalogItem = await VehicleCatalog.create(carData);

      // Create 2 instances for each model
      await VehicleInstance.create({
        catalogItem: catalogItem._id,
        registrationNumber: `KL-${Math.floor(1000 + Math.random() * 9000)}`,
        color: "White",
        currentLocation: "Bangalore",
        status: "available",
      });
      await VehicleInstance.create({
        catalogItem: catalogItem._id,
        registrationNumber: `KL-${Math.floor(1000 + Math.random() * 9000)}`,
        color: "Silver",
        currentLocation: "Mumbai",
        status: "available",
      });
    }

    console.log("Seeded Indian cars successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDB();
