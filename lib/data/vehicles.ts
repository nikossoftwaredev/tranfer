export interface VehicleConfig {
  image: string;
  model: string;
  category: string;
  capacity: string;
  luggage: string;
  features: string[];
  tags?: string[];
}

export const vehicles: VehicleConfig[] = [
  {
    image: "/images/fleet/mercedes-s-class.png",
    model: "Mercedes S-Class",
    category: "Luxury Sedan",
    capacity: "Up to 3 passengers",
    luggage: "2 large suitcases",
    features: [
      "Professional Greek Driver",
      "Free WiFi",
      "Leather Seats",
      "Climate Control",
      "Bottled Water",
      "Charging Outlets",
    ],
    tags: ["Business Class", "VIP"],
  },
  {
    image: "/images/fleet/mercedes-vito.png",
    model: "Mercedes Vito",
    category: "Luxury Van",
    capacity: "Up to 7 passengers",
    luggage: "6 large suitcases",
    features: [
      "Professional Greek Driver",
      "Free WiFi",
      "Leather Seats",
      "Climate Control",
      "Extra Legroom",
      "Charging Outlets",
    ],
    tags: ["Family Friendly", "Group Travel"],
  },
  {
    image: "/images/fleet/tesla-s.png",
    model: "Tesla Model S",
    category: "Electric Luxury Sedan",
    capacity: "Up to 3 passengers",
    luggage: "2 large suitcases",
    features: [
      "Professional Greek Driver",
      "Free WiFi",
      "Premium Interior",
      "Climate Control",
      "Zero Emissions",
      "Charging Outlets",
    ],
    tags: ["Eco Option", "Premium"],
  },
];
