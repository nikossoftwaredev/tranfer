export interface VehicleConfig {
  image: string;
  model: string;
  category: string;
  capacity: string;
  luggage: string;
  tags?: string[];
  description?: string;
}

export const vehicles: VehicleConfig[] = [
  {
    image: "/images/fleet/mercedes-s-class.avif",
    model: "Standard Class",
    category: "Luxury Sedan",
    capacity: "Up to 3 passengers",
    luggage: "3 large suitcases",
    description: "Mercedes E Class, BMW 5 Series, Cadillac XTS or similar",
    tags: ["businessClass"],
  },
  {
    image: "/images/fleet/mercedes-f-class.avif",
    model: "First Class",
    category: "Premium Sedan",
    capacity: "Up to 3 passengers",
    luggage: "3 large suitcases",
    description:
      "Mercedes S Class, BMW 7, Audi A8, Cadillac Escalade or similar",
    tags: ["businessClass", "vip", "premium"],
  },
  {
    image: "/images/fleet/mercedes-vito.avif",
    model: "Van Standard",
    category: "Luxury Van",
    capacity: "Up to 7 passengers",
    luggage: "7 large suitcases",
    description: "Mercedes Vito, Ford Custom, Chevrolet Suburban or similar",
    tags: ["familyFriendly", "groupTravel"],
  },
  {
    image: "/images/fleet/mercedes-v-class.avif",
    model: "Van First Class",
    category: "Premium Minivan",
    capacity: "Up to 6 passengers",
    luggage: "6 large suitcases",
    description: "Mercedes V Class, Cadillac Escalade or similar",
    tags: ["familyFriendly", "groupTravel", "premium"],
  },
  {
    image: "/images/fleet/mercedes-van-16.avif",
    model: "Minibus (16 Pax)",
    category: "Large Capacity Van",
    capacity: "Up to 16 passengers",
    luggage: "16 large suitcases",
    description: "Mercedes Sprinter, Ford Transit or similar",
    tags: ["groupTravel", "largeGroups"],
  },
];
