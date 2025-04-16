export interface Location {
  id: string;
  name: string;
  description?: string;
}

export const locations: Location[] = [
  {
    id: "athens-airport",
    name: "Athens International Airport (ATH)",
    description: "Eleftherios Venizelos International Airport",
  },
  {
    id: "piraeus-port",
    name: "Piraeus Port",
    description: "Main port of Athens for ferry connections",
  },
  {
    id: "syntagma-square",
    name: "Syntagma Square",
    description: "Central square of Athens",
  },
  {
    id: "acropolis",
    name: "Acropolis",
    description: "Ancient citadel in Athens",
  },
  {
    id: "plaka",
    name: "Plaka",
    description: "Historic neighborhood in Athens",
  },
  {
    id: "monastiraki",
    name: "Monastiraki",
    description: "Famous shopping district in Athens",
  },
  {
    id: "kifissia",
    name: "Kifissia",
    description: "Upscale northern suburb of Athens",
  },
  {
    id: "glyfada",
    name: "Glyfada",
    description: "Coastal suburb of Athens",
  },
  {
    id: "vouliagmeni",
    name: "Vouliagmeni",
    description: "Exclusive seaside suburb of Athens",
  },
  {
    id: "marina-zeas",
    name: "Marina Zeas",
    description: "Luxury marina in Piraeus",
  },
];
