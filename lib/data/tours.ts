export interface TourConfig {
  title: string;
  subtitle: string;
  cost: string;
  hours: number;
  image: string;
  slug: string;
  description: string[];
  highlights?: string[];
  includes?: string[];
}

export const tours: TourConfig[] = [
  {
    title: "Sunset Serenity at Poseidon's Haven",
    subtitle: "Experience the Majesty of the Poseidon Temple in Sounio",
    cost: "399",
    hours: 4,
    image: "/images/tours/poseidon_haven.jpg",
    slug: "poseidon-temple-sounio",
    description: [
      "Embark on a magnificent afternoon journey along the scenic Athens Riviera to Cape Sounio, home to the iconic Temple of Poseidon. This exclusive private tour allows you to experience one of Greece's most spectacular sunsets in a setting steeped in mythology and natural beauty.",
      "As you travel south from Athens, you'll enjoy breathtaking coastal views along the Saronic Gulf, with opportunities to stop at picturesque beaches and seaside towns. Your knowledgeable driver will share fascinating insights about the region's history and culture.",
      "Upon arrival at Cape Sounio, you'll be mesmerized by the majestic Temple of Poseidon perched dramatically on the cliff edge. Built in 444 BC, this ancient monument honors the mighty god of the sea, offering panoramic views of the Aegean.",
      "The highlight of your experience will be witnessing the magical sunset, as golden light bathes the temple columns and the sun dips into the sea - a truly unforgettable Greek moment.",
    ],
    highlights: [
      "Private luxury transportation with professional driver-guide",
      "Breathtaking Athens Riviera coastal drive",
      "Visit to the iconic Temple of Poseidon",
      "Spectacular sunset views over the Aegean Sea",
      "Free time to explore Cape Sounio",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },

  {
    title: "Nafplio Nouveau",
    subtitle:
      "A Day in the Charming Heart of Greece: Experience the Magic of Nafplio",
    cost: "250",
    hours: 6,
    image: "/images/tours/nafplio_nouveau.jpg",
    slug: "nafplio-nouveau",
    description: [
      "Discover the enchanting city of Nafplio, Greece's first capital and one of its most romantic destinations. This private day tour takes you through picturesque countryside to a coastal gem filled with Venetian architecture, charming streets, and rich history.",
      "Your journey begins with a comfortable drive through the scenic Peloponnese, passing by beautiful landscapes and historic sites. Upon arrival in Nafplio, you'll be captivated by its elegant ambiance, neoclassical mansions, and imposing fortifications.",
      "Explore the narrow cobblestone streets of the old town, visit the impressive Palamidi Fortress, and stroll along the beautiful seafront promenade. Your knowledgeable driver will share fascinating stories about Nafplio's pivotal role in modern Greek history.",
    ],
    highlights: [
      "Private luxury transportation with professional driver",
      "Scenic journey through the Peloponnese countryside",
      "Exploration of Nafplio's Old Town and fortress",
      "Breathtaking coastal views",
      "Free time for shopping and dining",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },
  {
    title: "Athenian Marvels Unveiled",
    subtitle:
      "Best of Athens in a Day: Uncover the City's Rich History and Iconic Landmarks",
    cost: "499",
    hours: 8,
    image: "/images/tours/athenian_marvels.jpg",
    slug: "athens-marvels",
    description: [
      "Experience the very best of Athens in one comprehensive private tour designed to showcase the city's iconic landmarks, rich history, and vibrant culture. This carefully crafted journey takes you through 2,500 years of history in comfort and style.",
      "Begin your exploration at the magnificent Acropolis, where you'll witness the architectural brilliance of the Parthenon and enjoy panoramic views of Athens. Continue to the state-of-the-art Acropolis Museum to discover treasures of ancient Greek civilization.",
      "Your tour includes visits to the Temple of Zeus, Hadrian's Arch, the historic Plaka district, and the Parliament building to witness the ceremonial Changing of the Guard. Throughout the day, your knowledgeable driver will provide fascinating insights about Athens' past and present.",
      "This tour offers a perfect blend of history, culture, and modern city life, giving you a comprehensive understanding of Greece's remarkable capital.",
    ],
    highlights: [
      "Private luxury transportation between all sites",
      "Visit to the Acropolis and Parthenon",
      "Exploration of the historic Plaka district",
      "Panoramic city tour including key landmarks",
      "Changing of the Guard ceremony",
      "Free time for authentic Greek dining",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },
  {
    title: "Athens Unveiled",
    subtitle:
      "A Journey Beyond the Ordinary: Discover Athens from a Different Perspective",
    cost: "299",
    hours: 6,
    image: "/images/tours/athens_unveiled.jpg",
    slug: "athens-unveiled",
    description: [
      "Experience Athens beyond the typical tourist routes with this immersive private tour designed to reveal the authentic character and hidden gems of Greece's vibrant capital city. This journey offers a fresh perspective on Athens, combining lesser-known treasures with iconic highlights.",
      "Begin with a panoramic drive through elegant neighborhoods like Kolonaki and Mets, then explore the tranquil National Garden and the impressive Panathenaic Stadium. Visit the vibrant Central Market for a sensory feast, and discover charming neighborhoods where Athenians actually live.",
      "Your knowledgeable driver will share fascinating local insights and stories that bring the city to life, revealing Athens as both an ancient marvel and a dynamic modern metropolis. Enjoy free time to wander through authentic neighborhoods where few tourists venture.",
      "This carefully crafted experience provides a deeper connection to the real Athens, offering perspectives and memories that conventional tours simply cannot match.",
    ],
    highlights: [
      "Private luxury transportation throughout Athens",
      "Visit to the Panathenaic Stadium",
      "Exploration of authentic local neighborhoods",
      "Experience the vibrant Athens Central Market",
      "Panoramic views from lesser-known viewpoints",
      "Free time for authentic Greek coffee and cuisine",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },
  {
    title: "Corinthian Wonders",
    subtitle: "Canal, Corinth, and Loutraki Delights: A Day to Remember",
    cost: "700",
    hours: 7,
    image: "/images/tours/corinthian_wonders.jpg",
    slug: "corinthian-wonders",
    description: [
      "Journey through time and engineering marvel on this captivating private tour to the Corinth region, where ancient history meets modern achievement. Experience the perfect blend of archaeological wonders, natural beauty, and contemporary Greek life.",
      "Begin your adventure with a visit to the impressive Corinth Canal, a remarkable 19th-century engineering feat cutting through the narrow isthmus that connects mainland Greece to the Peloponnese. Marvel at the steep limestone walls rising 90 meters above the water.",
      "Continue to Ancient Corinth, once one of the most important cities of antiquity. Explore the well-preserved ruins, including the Temple of Apollo and the ancient marketplace, while your knowledgeable driver shares fascinating insights about this pivotal historical center.",
      "Your journey includes a visit to the elegant seaside town of Loutraki, famous for its therapeutic thermal waters and beautiful beaches. Enjoy free time for a delicious Greek lunch by the sea and perhaps a refreshing swim in the crystal-clear waters of the Corinthian Gulf.",
    ],
    highlights: [
      "Private luxury transportation throughout the tour",
      "Visit to the impressive Corinth Canal",
      "Exploration of Ancient Corinth archaeological site",
      "Free time in the seaside resort town of Loutraki",
      "Stunning coastal views",
      "Opportunity for authentic Greek dining by the sea",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },
  {
    title: "Delphi Delights",
    subtitle:
      "A Day of Ancient Wisdom and Natural Beauty: Embark on a Journey to Delphi",
    cost: "866",
    hours: 10,
    image: "/images/tours/delphi_delights.jpg",
    slug: "delphi-delights",
    description: [
      "Embark on an unforgettable journey to Delphi, the sacred center of the ancient world and the seat of the most important oracle in ancient Greece. This private tour combines breathtaking mountain scenery with profound historical and spiritual significance.",
      "Your adventure begins with a scenic drive through the beautiful Greek countryside and picturesque villages, gradually ascending Mount Parnassus. Throughout the journey, your knowledgeable driver will share fascinating insights about the significance of Delphi in ancient Greek civilization.",
      "Upon arrival, you'll explore the magnificent archaeological site of Delphi, including the Sacred Way, the Temple of Apollo, the ancient theater, and the well-preserved stadium. Marvel at the remarkable Tholos of Athena Pronaia and visit the Delphi Archaeological Museum to view its impressive collection of artifacts.",
      "The mystical atmosphere of Delphi, combined with its spectacular setting on the slopes of Mount Parnassus overlooking the Gulf of Corinth, creates an experience that resonates with both natural beauty and profound cultural significance.",
    ],
    highlights: [
      "Private luxury transportation to and from Delphi",
      "Scenic drive through the Greek mainland countryside",
      "Exploration of the UNESCO World Heritage archaeological site",
      "Visit to the Delphi Archaeological Museum",
      "Spectacular mountain and valley views",
      "Optional traditional Greek lunch in Arachova or Delphi village",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },
  {
    title: "Olympian Odyssey",
    subtitle:
      "A Day Trip to the Birthplace of the Gods: Explore the Wonders of Olympia",
    cost: "650",
    hours: 9,
    image: "/images/tours/olympian_odyssey.jpg",
    slug: "olympian-odyssey",
    description: [
      "Step back in time with this extraordinary private tour to Ancient Olympia, birthplace of the Olympic Games and one of Greece's most significant archaeological sites. This immersive journey combines athletic heritage, mythological significance, and serene natural beauty.",
      "Your adventure begins with a comfortable drive through the scenic Peloponnese peninsula, passing charming villages, coastal vistas, and verdant landscapes. Throughout the journey, your knowledgeable driver will share fascinating tales of Greek mythology and Olympic history.",
      "Upon arrival at Olympia, you'll explore the extensive archaeological site where athletic competitions were held every four years beginning in 776 BC. Marvel at the Temple of Zeus, which once housed the colossal gold and ivory statue considered one of the Seven Wonders of the Ancient World.",
      "Visit the Olympic Stadium, where ancient athletes competed for glory, and the Archaeological Museum, home to remarkable sculptures including the famous Hermes of Praxiteles. This profound experience connects you directly to the origins of the world's most celebrated sporting tradition.",
    ],
    highlights: [
      "Private luxury transportation to and from Olympia",
      "Scenic journey through the Peloponnese countryside",
      "Exploration of the archaeological site of Ancient Olympia",
      "Visit to the Olympia Archaeological Museum",
      "Olympic Stadium where the original games were held",
      "Optional authentic Greek lunch in a local village",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },
  {
    title: "Epic Encounters at Epidaurus",
    subtitle:
      "Journey to the Ancient Theatre: Witness the Timeless Beauty of Epidaurus",
    cost: "500",
    hours: 5,
    image: "/images/tours/epic_encounters.jpg",
    slug: "epidaurus-theatre",
    description: [
      "Experience the acoustic and architectural marvel of the ancient world on this private tour to the Theater of Epidaurus, renowned for its perfect design, remarkable preservation, and extraordinary acoustics. This journey combines cultural heritage with stunning natural landscapes.",
      "Your adventure begins with a scenic drive through the eastern Peloponnese, passing through olive groves, vineyards, and picturesque coastal scenery. Throughout the journey, your knowledgeable driver will share fascinating insights about the historical and cultural significance of Epidaurus.",
      "Upon arrival, you'll be awestruck by the magnificence of the ancient theater, built in the 4th century BC and capable of seating up to 14,000 spectators. Marvel at its perfect proportions and test its legendary acoustics, where even a whisper from the center stage can be heard in the highest row.",
      "Explore the surrounding Sanctuary of Asklepios, a healing center of antiquity and UNESCO World Heritage site. Your driver will illuminate the fascinating connection between ancient Greek theater, medicine, and religious practices that converged at this remarkable location.",
    ],
    highlights: [
      "Private luxury transportation to and from Epidaurus",
      "Visit to the magnificent ancient Theater of Epidaurus",
      "Exploration of the Sanctuary of Asklepios",
      "Experience the theater's legendary perfect acoustics",
      "Scenic drive through the eastern Peloponnese countryside",
      "Optional stop at a local winery or traditional taverna",
    ],
    includes: [
      "Luxury private vehicle and professional driver",
      "Hotel/accommodation pickup and drop-off",
      "Bottled water and refreshments",
      "Free Wi-Fi in vehicle",
      "All taxes and fees",
    ],
  },
];
