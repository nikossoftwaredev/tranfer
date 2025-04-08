export interface TourConfig {
  title: string;
  subtitle: string;
  cost: string;
  hours: number;
  image: string;
}

export const tours: TourConfig[] = [
  {
    title: "Sunset Serenity at Poseidon's Haven",
    subtitle: "Experience the Majesty of the Poseidon Temple in Sounio",
    cost: "399",
    hours: 4,
    image: "/images/tours/poseidon_haven.jpg",
  },

  {
    title: "Nafplio Nouveau",
    subtitle:
      "A Day in the Charming Heart of Greece: Experience the Magic of Nafplio",
    cost: "250",
    hours: 6,
    image: "/images/tours/nafplio_nouveau.jpg",
  },
  {
    title: "Athenian Marvels Unveiled",
    subtitle:
      "Best of Athens in a Day: Uncover the City's Rich History and Iconic Landmarks",
    cost: "499",
    hours: 8,
    image: "/images/tours/athenian_marvels.jpg",
  },
  {
    title: "Athens Unveiled",
    subtitle:
      "A Journey Beyond the Ordinary: Discover Athens from a Different Perspective",
    cost: "299",
    hours: 6,
    image: "/images/tours/athens_unveiled.jpg",
  },
  {
    title: "Corinthian Wonders",
    subtitle: "Canal, Corinth, and Loutraki Delights: A Day to Remember",
    cost: "700",
    hours: 7,
    image: "/images/tours/corinthian_wonders.jpg",
  },
  {
    title: "Delphi Delights",
    subtitle:
      "A Day of Ancient Wisdom and Natural Beauty: Embark on a Journey to Delphi",
    cost: "866",
    hours: 0,
    image: "/images/tours/delphi_delights.jpg",
  },
  {
    title: "Olympian Odyssey",
    subtitle:
      "A Day Trip to the Birthplace of the Gods: Explore the Wonders of Olympia",
    cost: "650",
    hours: 9,
    image: "/images/tours/olympian_odyssey.jpg",
  },
  {
    title: "Epic Encounters at Epidaurus",
    subtitle:
      "Journey to the Ancient Theatre: Witness the Timeless Beauty of Epidaurus",
    cost: "500",
    hours: 5,
    image: "/images/tours/epic_encounters.jpg",
  },
];
