export interface TourConfig {
  id: string;
  slug: string;
  image: string;
  cost: string;
  hours: number;
  translations: {
    [locale: string]: {
      title: string;
      subtitle: string;
      description: string[];
      highlights?: string[];
      includes?: string[];
    };
  };
}

export const tours: TourConfig[] = [
  {
    id: "poseidon-temple",
    slug: "poseidon-temple-sounio",
    image: "/images/tours/poseidon_haven.jpg",
    cost: "399",
    hours: 4,
    translations: {
      "en-US": {
        title: "Sunset Serenity at Poseidon's Haven",
        subtitle: "Experience the Majesty of the Poseidon Temple in Sounio",
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
      "el": {
        title: "Ηλιοβασίλεμα στο Καταφύγιο του Ποσειδώνα",
        subtitle: "Βιώστε τη Μεγαλοπρέπεια του Ναού του Ποσειδώνα στον Σούνιο",
        description: [
          "Επιβιβαστείτε σε ένα μεγαλειώδες απογευματινό ταξίδι κατά μήκος της γραφικής Αθηναϊκής Ριβιέρας προς το Ακρωτήριο Σούνιο, όπου βρίσκεται ο εμβληματικός Ναός του Ποσειδώνα. Αυτή η αποκλειστική ιδιωτική περιήγηση σας επιτρέπει να βιώσετε ένα από τα πιο εντυπωσιακά ηλιοβασιλέματα της Ελλάδας σε ένα περιβάλλον γεμάτο μυθολογία και φυσική ομορφιά.",
          "Καθώς ταξιδεύετε νότια από την Αθήνα, θα απολαύσετε εντυπωσιακές θάλασσες θέας κατά μήκος του Σαρωνικού Κόλπου, με ευκαιρίες για στάσεις σε γραφικές παραλίες και παραθαλάσσιες πόλεις. Ο γνώστης οδηγός σας θα μοιραστεί συναρπαστικές πληροφορίες για την ιστορία και τον πολιτισμό της περιοχής.",
          "Με την άφιξή σας στο Ακρωτήριο Σούνιο, θα γοητευτείτε από τον μεγαλειώδη Ναό του Ποσειδώνα που στέκεται δραματικά στην άκρη του βράχου. Χτισμένος το 444 π.Χ., αυτό το αρχαίο μνημείο τιμά τον ισχυρό θεό της θάλασσας, προσφέροντας πανοραμική θέα στο Αιγαίο.",
          "Το αποκορύφωμα της εμπειρίας σας θα είναι να παρακολουθήσετε το μαγικό ηλιοβασίλεμα, καθώς το χρυσό φως λούζει τις κολόνες του ναού και ο ήλιος βυθίζεται στη θάλασσα - μια πραγματικά αξέχαστη ελληνική στιγμή.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά με επαγγελματία οδηγό-ξενάγο",
          "Εντυπωσιακή παράκτια διαδρομή στην Αθηναϊκή Ριβιέρα",
          "Επίσκεψη στον εμβληματικό Ναό του Ποσειδώνα",
          "Εντυπωσιακή θέα του ηλιοβασιλέματος πάνω από το Αιγαίο",
          "Ελεύθερος χρόνος για εξερεύνηση του Ακρωτηρίου Σούνιο",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },

  {
    id: "nafplio-nouveau",
    slug: "nafplio-nouveau",
    image: "/images/tours/nafplio_nouveau.jpg",
    cost: "250",
    hours: 6,
    translations: {
      "en-US": {
        title: "Nafplio Nouveau",
        subtitle: "A Day in the Charming Heart of Greece: Experience the Magic of Nafplio",
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
      "el": {
        title: "Ναύπλιο Νουβό",
        subtitle: "Μια Μέρα στην Γοητευτική Καρδιά της Ελλάδας: Βιώστε τη Μαγεία του Ναυπλίου",
        description: [
          "Ανακαλύψτε τη γοητευτική πόλη του Ναυπλίου, την πρώτη πρωτεύουσα της Ελλάδας και ένα από τα πιο ρομαντικά της προορισμούς. Αυτή η ιδιωτική ημερήσια περιήγηση σας οδηγεί μέσα από γραφική ύπαιθρο σε ένα παράκτιο διαμάντι γεμάτο βενετσιάνικη αρχιτεκτονική, γοητευτικά δρομάκια και πλούσια ιστορία.",
          "Το ταξίδι σας ξεκινά με μια άνετη διαδρομή μέσα από την γραφική Πελοπόννησο, περνώντας από όμορφα τοπία και ιστορικά σημεία. Με την άφιξή σας στο Ναύπλιο, θα γοητευτείτε από την κομψή ατμόσφαιρά του, τα νεοκλασικά αρχοντικά και τις εντυπωσιακές οχυρώσεις.",
          "Εξερευνήστε τα στενά πλακόστρωτα δρομάκια της παλιάς πόλης, επισκεφθείτε την εντυπωσιακή Φρούριο Παλαμήδι, και κάντε βόλτα κατά μήκος της όμορφης παραλιακής λεωφόρου. Ο γνώστης οδηγός σας θα μοιραστεί συναρπαστικές ιστορίες για τον καθοριστικό ρόλο του Ναυπλίου στη σύγχρονη ελληνική ιστορία.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά με επαγγελματία οδηγό",
          "Γραφική διαδρομή μέσα από την ύπαιθρο της Πελοποννήσου",
          "Εξερεύνηση της Παλιάς Πόλης και του φρουρίου του Ναυπλίου",
          "Εντυπωσιακές θάλασσες θέας",
          "Ελεύθερος χρόνος για ψώνια και φαγητό",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },
  {
    id: "athenian-marvels",
    slug: "athens-marvels",
    image: "/images/tours/athenian_marvels.jpg",
    cost: "499",
    hours: 8,
    translations: {
      "en-US": {
        title: "Athenian Marvels Unveiled",
        subtitle: "Best of Athens in a Day: Uncover the City's Rich History and Iconic Landmarks",
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
      "el": {
        title: "Τα Θαύματα της Αθήνας",
        subtitle: "Το Καλύτερο της Αθήνας σε Μια Μέρα: Ανακαλύψτε την Πλούσια Ιστορία και τα Εμβληματικά Μνημεία της Πόλης",
        description: [
          "Βιώστε το καλύτερο της Αθήνας σε μια ολοκληρωμένη ιδιωτική περιήγηση σχεδιασμένη να παρουσιάσει τα εμβληματικά μνημεία, την πλούσια ιστορία και τον ζωντανό πολιτισμό της πόλης. Αυτό το προσεκτικά σχεδιασμένο ταξίδι σας οδηγεί μέσα από 2,500 χρόνια ιστορίας με άνεση και στυλ.",
          "Ξεκινήστε την εξερεύνησή σας στην μεγαλειώδη Ακρόπολη, όπου θα θαυμάσετε την αρχιτεκτονική μεγαλοπρέπεια του Παρθενώνα και θα απολαύσετε πανοραμική θέα της Αθήνας. Συνεχίστε στο σύγχρονο Μουσείο Ακρόπολης για να ανακαλύψετε θησαυρούς του αρχαίου ελληνικού πολιτισμού.",
          "Η περιήγησή σας περιλαμβάνει επισκέψεις στον Ναό του Δία, την Αψίδα του Αδριανού, την ιστορική συνοικία της Πλάκας και το Κτήριο της Βουλής για να παρακολουθήσετε την τελετή της Αλλαγής της Φρουράς. Καθ' όλη τη διάρκεια της ημέρας, ο γνώστης οδηγός σας θα παρέχει συναρπαστικές πληροφορίες για το παρελθόν και το παρόν της Αθήνας.",
          "Αυτή η περιήγηση προσφέρει την τέλεια μίξη ιστορίας, πολιτισμού και σύγχρονης αστικής ζωής, δίνοντάς σας μια ολοκληρωμένη κατανόηση της αξιοσημείωτης πρωτεύουσας της Ελλάδας.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά μεταξύ όλων των σημείων",
          "Επίσκεψη στην Ακρόπολη και τον Παρθενώνα",
          "Εξερεύνηση της ιστορικής συνοικίας της Πλάκας",
          "Πανοραμική περιήγηση της πόλης με τα σημαντικότερα μνημεία",
          "Τελετή της Αλλαγής της Φρουράς",
          "Ελεύθερος χρόνος για αυθεντικό ελληνικό φαγητό",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },
  {
    id: "athens-unveiled",
    slug: "athens-unveiled",
    image: "/images/tours/athens_unveiled.jpg",
    cost: "299",
    hours: 6,
    translations: {
      "en-US": {
        title: "Athens Unveiled",
        subtitle: "A Journey Beyond the Ordinary: Discover Athens from a Different Perspective",
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
      "el": {
        title: "Η Αθήνα Αποκαλύπτεται",
        subtitle: "Ένα Ταξίδι Πέρα από το Συνήθειο: Ανακαλύψτε την Αθήνα από μια Διαφορετική Προοπτική",
        description: [
          "Βιώστε την Αθήνα πέρα από τις τυπικές τουριστικές διαδρομές με αυτή την εμβαθυντική ιδιωτική περιήγηση σχεδιασμένη να αποκαλύψει τον αυθεντικό χαρακτήρα και τα κρυμμένα διαμάντια της ζωντανής πρωτεύουσας της Ελλάδας. Αυτό το ταξίδι προσφέρει μια φρέσκια προοπτική στην Αθήνα, συνδυάζοντας λιγότερο γνωστούς θησαυρούς με εμβληματικά αξιοθέατα.",
          "Ξεκινήστε με μια πανοραμική διαδρομή μέσα από κομψές γειτονιές όπως η Κολωνάκι και η Μέτς, στη συνέχεια εξερευνήστε τον γαλήνιο Εθνικό Κήπο και το εντυπωσιακό Παναθηναϊκό Στάδιο. Επισκεφθείτε την ζωντανή Κεντρική Αγορά για μια αισθητηριακή γιορτή, και ανακαλύψτε γοητευτικές γειτονιές όπου ζουν οι Αθηναίοι.",
          "Ο γνώστης οδηγός σας θα μοιραστεί συναρπαστικές τοπικές πληροφορίες και ιστορίες που φέρνουν την πόλη στη ζωή, αποκαλύπτοντας την Αθήνα τόσο ως αρχαίο θαύμα όσο και ως δυναμική σύγχρονη μητρόπολη. Απολαύστε ελεύθερο χρόνο για να περιπλανηθείτε σε αυθεντικές γειτονιές όπου λίγοι τουρίστες τολμούν να πάνε.",
          "Αυτή η προσεκτικά σχεδιασμένη εμπειρία παρέχει μια βαθύτερη σύνδεση με την πραγματική Αθήνα, προσφέροντας προοπτικές και αναμνήσεις που οι συμβατικές περιηγήσεις απλά δεν μπορούν να ταιριάξουν.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά σε όλη την Αθήνα",
          "Επίσκεψη στο Παναθηναϊκό Στάδιο",
          "Εξερεύνηση αυθεντικών τοπικών γειτονιών",
          "Εμπειρία της ζωντανής Κεντρικής Αγοράς της Αθήνας",
          "Πανοραμικές θέαι από λιγότερο γνωστά σημεία",
          "Ελεύθερος χρόνος για αυθεντικό ελληνικό καφέ και κουζίνα",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },
  {
    id: "corinthian-wonders",
    slug: "corinthian-wonders",
    image: "/images/tours/corinthian_wonders.jpg",
    cost: "700",
    hours: 7,
    translations: {
      "en-US": {
        title: "Corinthian Wonders",
        subtitle: "Canal, Corinth, and Loutraki Delights: A Day to Remember",
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
      "el": {
        title: "Κορινθιακά Θαύματα",
        subtitle: "Κανάλι, Κόρινθος και Λουτράκι: Μια Μέρα για να Θυμάστε",
        description: [
          "Ταξιδέψτε μέσα στο χρόνο και το θαύμα της μηχανικής σε αυτή την γοητευτική ιδιωτική περιήγηση στην περιοχή της Κορίνθου, όπου η αρχαία ιστορία συναντά το σύγχρονο επίτευγμα. Βιώστε την τέλεια μίξη αρχαιολογικών θαυμάτων, φυσικής ομορφιάς και σύγχρονης ελληνικής ζωής.",
          "Ξεκινήστε την περιπέτειά σας με μια επίσκεψη στο εντυπωσιακό Κανάλι της Κορίνθου, ένα αξιοσημείωτο μηχανικό επίτευγμα του 19ου αιώνα που κόβει τον στενό ισθμό που συνδέει την ηπειρωτική Ελλάδα με την Πελοπόννησο. Θαυμάστε τους απότομους ασβεστολιθικούς τοίχους που υψώνονται 90 μέτρα πάνω από το νερό.",
          "Συνεχίστε στην Αρχαία Κόρινθο, κάποτε μια από τις πιο σημαντικές πόλεις της αρχαιότητας. Εξερευνήστε τα καλά διατηρημένα ερείπια, συμπεριλαμβανομένου του Ναού του Απόλλωνα και της αρχαίας αγοράς, ενώ ο γνώστης οδηγός σας μοιράζεται συναρπαστικές πληροφορίες για αυτό το καθοριστικό ιστορικό κέντρο.",
          "Το ταξίδι σας περιλαμβάνει μια επίσκεψη στην κομψή παραθαλάσσια πόλη του Λουτρακίου, διάσημη για τα θεραπευτικά θερμά νερά της και τις όμορφες παραλίες της. Απολαύστε ελεύθερο χρόνο για ένα νόστιμο ελληνικό γεύμα δίπλα στη θάλασσα και ίσως ένα δροσιστικό κολύμπι στα κρυστάλλινα νερά του Κορινθιακού Κόλπου.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά σε όλη την περιήγηση",
          "Επίσκεψη στο εντυπωσιακό Κανάλι της Κορίνθου",
          "Εξερεύνηση του αρχαιολογικού χώρου της Αρχαίας Κορίνθου",
          "Ελεύθερος χρόνος στην παραθαλάσσια πόλη του Λουτρακίου",
          "Εντυπωσιακές θάλασσες θέαι",
          "Ευκαιρία για αυθεντικό ελληνικό φαγητό δίπλα στη θάλασσα",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },
  {
    id: "delphi-delights",
    slug: "delphi-delights",
    image: "/images/tours/delphi_delights.jpg",
    cost: "866",
    hours: 10,
    translations: {
      "en-US": {
        title: "Delphi Delights",
        subtitle: "A Day of Ancient Wisdom and Natural Beauty: Embark on a Journey to Delphi",
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
      "el": {
        title: "Δελφικές Απολαύσεις",
        subtitle: "Μια Μέρα Αρχαίας Σοφίας και Φυσικής Ομορφιάς: Επιβιβαστείτε σε ένα Ταξίδι στους Δελφούς",
        description: [
          "Επιβιβαστείτε σε ένα αξέχαστο ταξίδι στους Δελφούς, το ιερό κέντρο του αρχαίου κόσμου και την έδρα του πιο σημαντικού μαντείου στην αρχαία Ελλάδα. Αυτή η ιδιωτική περιήγηση συνδυάζει εντυπωσιακά βουνά με βαθιά ιστορική και πνευματική σημασία.",
          "Η περιπέτειά σας ξεκινά με μια γραφική διαδρομή μέσα από την όμορφη ελληνική ύπαιθρο και γραφικά χωριά, ανεβαίνοντας σταδιακά στο όρος Παρνασσός. Καθ' όλη τη διάρκεια του ταξιδιού, ο γνώστης οδηγός σας θα μοιραστεί συναρπαστικές πληροφορίες για τη σημασία των Δελφών στον αρχαίο ελληνικό πολιτισμό.",
          "Με την άφιξή σας, θα εξερευνήσετε τον μεγαλειώδη αρχαιολογικό χώρο των Δελφών, συμπεριλαμβανομένης της Ιεράς Οδού, του Ναού του Απόλλωνα, του αρχαίου θεάτρου και του καλά διατηρημένου σταδίου. Θαυμάστε τον αξιοσημείωτο Θόλο της Αθηνάς Προναίας και επισκεφθείτε το Αρχαιολογικό Μουσείο Δελφών για να δείτε την εντυπωσιακή συλλογή του.",
          "Η μυστηριακή ατμόσφαιρα των Δελφών, σε συνδυασμό με το θεαματικό τοποθεσία στις πλαγιές του Παρνασσού με θέα στον Κορινθιακό Κόλπο, δημιουργεί μια εμπειρία που συνδυάζει φυσική ομορφιά με βαθιά πολιτιστική σημασία.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά από και προς τους Δελφούς",
          "Γραφική διαδρομή μέσα από την ηπειρωτική ελληνική ύπαιθρο",
          "Εξερεύνηση του αρχαιολογικού χώρου Μνημείου Παγκόσμιας Κληρονομιάς της UNESCO",
          "Επίσκεψη στο Αρχαιολογικό Μουσείο Δελφών",
          "Εντυπωσιακές θέαι βουνών και κοιλάδων",
          "Προαιρετικό παραδοσιακό ελληνικό γεύμα στην Αράχωβα ή στο χωριό των Δελφών",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },
  {
    id: "olympian-odyssey",
    slug: "olympian-odyssey",
    image: "/images/tours/olympian_odyssey.jpg",
    cost: "650",
    hours: 9,
    translations: {
      "en-US": {
        title: "Olympian Odyssey",
        subtitle: "A Day Trip to the Birthplace of the Gods: Explore the Wonders of Olympia",
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
      "el": {
        title: "Ολυμπιακή Οδύσσεια",
        subtitle: "Μια Ημερήσια Εκδρομή στη Γενέτειρα των Θεών: Εξερευνήστε τα Θαύματα της Ολυμπίας",
        description: [
          "Κάντε ένα βήμα πίσω στο χρόνο με αυτή την εξαιρετική ιδιωτική περιήγηση στην Αρχαία Ολυμπία, τη γενέτειρα των Ολυμπιακών Αγώνων και ένα από τα πιο σημαντικά αρχαιολογικά μνημεία της Ελλάδας. Αυτό το εμβαθυντικό ταξίδι συνδυάζει την αθλητική κληρονομιά, τη μυθολογική σημασία και την γαλήνια φυσική ομορφιά.",
          "Η περιπέτειά σας ξεκινά με μια άνετη διαδρομή μέσα από την γραφική χερσόνησο της Πελοποννήσου, περνώντας από γοητευτικά χωριά, θάλασσες θέαι και πράσινα τοπία. Καθ' όλη τη διάρκεια του ταξιδιού, ο γνώστης οδηγός σας θα μοιραστεί συναρπαστικές ιστορίες της ελληνικής μυθολογίας και της ολυμπιακής ιστορίας.",
          "Με την άφιξή σας στην Ολυμπία, θα εξερευνήσετε τον εκτεταμένο αρχαιολογικό χώρο όπου διεξάγονταν οι αθλητικοί αγώνες κάθε τέσσερα χρόνια από το 776 π.Χ. Θαυμάστε τον Ναό του Δία, που κάποτε φιλοξενούσε το κολοσσιαίο χρυσό και ελεφαντόδοντο άγαλμα που θεωρείται ένα από τα Επτά Θαύματα του Αρχαίου Κόσμου.",
          "Επισκεφθείτε το Ολυμπιακό Στάδιο, όπου οι αρχαίοι αθλητές αγωνίζονταν για δόξα, και το Αρχαιολογικό Μουσείο, που φιλοξενεί αξιοσημείωτα γλυπτά συμπεριλαμβανομένου του διάσημου Ερμή του Πραξιτέλη. Αυτή η βαθιά εμπειρία σας συνδέει άμεσα με τις απαρχές της πιο γιορτασμένης αθλητικής παράδοσης του κόσμου.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά από και προς την Ολυμπία",
          "Γραφική διαδρομή μέσα από την ύπαιθρο της Πελοποννήσου",
          "Εξερεύνηση του αρχαιολογικού χώρου της Αρχαίας Ολυμπίας",
          "Επίσκεψη στο Αρχαιολογικό Μουσείο Ολυμπίας",
          "Ολυμπιακό Στάδιο όπου διεξάγονταν οι αρχικοί αγώνες",
          "Προαιρετικό αυθεντικό ελληνικό γεύμα σε ένα τοπικό χωριό",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },
  {
    id: "epidaurus-theatre",
    slug: "epidaurus-theatre",
    image: "/images/tours/epic_encounters.jpg",
    cost: "500",
    hours: 5,
    translations: {
      "en-US": {
        title: "Epic Encounters at Epidaurus",
        subtitle: "Journey to the Ancient Theatre: Witness the Timeless Beauty of Epidaurus",
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
      "el": {
        title: "Επικές Συναντήσεις στην Επίδαυρο",
        subtitle: "Ταξίδι στο Αρχαίο Θέατρο: Μάρτυρες της Αθάνατης Ομορφιάς της Επιδαύρου",
        description: [
          "Βιώστε το ακουστικό και αρχιτεκτονικό θαύμα του αρχαίου κόσμου σε αυτή την ιδιωτική περιήγηση στο Θέατρο της Επιδαύρου, διάσημο για την τέλεια σχεδίαση, την αξιοσημείωτη διατήρηση και τις εξαιρετικές ακουστικές του. Αυτό το ταξίδι συνδυάζει την πολιτιστική κληρονομιά με εντυπωσιακά φυσικά τοπία.",
          "Η περιπέτειά σας ξεκινά με μια γραφική διαδρομή μέσα από την ανατολική Πελοπόννησο, περνώντας από ελαιώνες, αμπελώνες και γραφικά παραθαλάσσια τοπία. Καθ' όλη τη διάρκεια του ταξιδιού, ο γνώστης οδηγός σας θα μοιραστεί συναρπαστικές πληροφορίες για την ιστορική και πολιτιστική σημασία της Επιδαύρου.",
          "Με την άφιξή σας, θα εντυπωσιαστείτε από τη μεγαλοπρέπεια του αρχαίου θεάτρου, χτισμένου τον 4ο αιώνα π.Χ. και ικανό να φιλοξενήσει έως και 14,000 θεατές. Θαυμάστε τις τέλειες αναλογίες του και δοκιμάστε τις θρυλικές ακουστικές του, όπου ακόμα και ένα ψίθυρισμα από το κέντρο της σκηνής μπορεί να ακουστεί στην πιο ψηλή σειρά.",
          "Εξερευνήστε τον γύρω Ιερό του Ασκληπιού, ένα κέντρο θεραπείας της αρχαιότητας και Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO. Ο οδηγός σας θα φωτίσει τη συναρπαστική σύνδεση μεταξύ του αρχαίου ελληνικού θεάτρου, της ιατρικής και των θρησκευτικών πρακτικών που συγκλίνουν σε αυτή την αξιοσημείωτη τοποθεσία.",
        ],
        highlights: [
          "Ιδιωτική πολυτελής μεταφορά από και προς την Επίδαυρο",
          "Επίσκεψη στο μεγαλειώδες αρχαίο Θέατρο της Επιδαύρου",
          "Εξερεύνηση του Ιερού του Ασκληπιού",
          "Εμπειρία των θρυλικών τέλειων ακουστικών του θεάτρου",
          "Γραφική διαδρομή μέσα από την ανατολική ύπαιθρο της Πελοποννήσου",
          "Προαιρετική στάση σε τοπικό οινοποιείο ή παραδοσιακή ταβέρνα",
        ],
        includes: [
          "Πολυτελές ιδιωτικό όχημα και επαγγελματίας οδηγός",
          "Παραλαβή και επιστροφή από το ξενοδοχείο/κατάλυμα",
          "Εμφιαλωμένο νερό και αναψυκτικά",
          "Δωρεάν Wi-Fi στο όχημα",
          "Όλοι οι φόροι και τα τέλη",
        ],
      },
    },
  },
];
