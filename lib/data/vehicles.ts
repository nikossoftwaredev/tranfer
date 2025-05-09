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
    features: ["driver", "leather", "climate", "water", "charging"],
    tags: ["businessClass", "vip"],
  },
  {
    image: "/images/fleet/mercedes-vito.png",
    model: "Mercedes Vito",
    category: "Luxury Van",
    capacity: "Up to 7 passengers",
    luggage: "6 large suitcases",
    features: ["driver", "leather", "climate", "legroom", "charging"],
    tags: ["familyFriendly", "groupTravel"],
  },
  {
    image: "/images/fleet/mercedes-vclass.png",
    model: "Mercedes V-Class",
    category: "Luxury Minivan",
    capacity: "Up to 7 passengers",
    luggage: "6 large suitcases",
    features: ["driver", "leather", "climate", "legroom", "premium"],
    tags: ["familyFriendly", "groupTravel", "premium"],
  },
];
