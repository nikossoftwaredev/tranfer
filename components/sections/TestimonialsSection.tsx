import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
};

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
  rating,
}: TestimonialProps) => {
  return (
    <div className="bg-background rounded-lg p-6 border border-border shadow-sm">
      {/* Rating */}
      <div className="flex text-primary mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 mr-1"
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-foreground mb-6 italic">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center">
        {avatar ? (
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image
              src={avatar}
              alt={author}
              className="h-full w-full object-cover"
              width={48}
              height={48}
            />
          </div>
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
            <span className="text-lg font-medium">{author.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const t = useTranslations("Testimonials");
  const locale = useLocale();

  const testimonials = [
    {
      translations: {
        "en-US": {
          quote: "The service was impeccable from start to finish. The driver was professional, the car was immaculate, and the entire experience exceeded my expectations.",
          author: "James Wilson",
          role: "Business Executive",
        },
        "el": {
          quote: "Η υπηρεσία ήταν άψογη από την αρχή μέχρι το τέλος. Ο οδηγός ήταν επαγγελματίας, το αυτοκίνητο ήταν άψογο και ολόκληρη η εμπειρία ξεπέρασε τις προσδοκίες μου.",
          author: "James Wilson",
          role: "Επιχειρηματίας",
        }
      },
      rating: 5,
    },
    {
      translations: {
        "en-US": {
          quote: "We booked Poseidon Transfers for our wedding day transportation and couldn't have been happier. The attention to detail and the luxurious vehicles made our special day even more memorable.",
          author: "Sarah & Michael",
          role: "Newlyweds",
        },
        "el": {
          quote: "Κλείσαμε την Poseidon Transfers για τη μεταφορά της ημέρας του γάμου μας και δεν θα μπορούσαμε να είμαστε πιο ευχαριστημένοι. Η προσοχή στη λεπτομέρεια και τα πολυτελή οχήματα έκαναν την ειδική μας μέρα ακόμα πιο αξέχαστη.",
          author: "Sarah & Michael",
          role: "Νεόνυμφοι",
        }
      },
      rating: 5,
    },
    {
      translations: {
        "en-US": {
          quote: "As someone who travels frequently for business, I appreciate the reliability and comfort that Poseidon Transfers provides. Their airport pickup service is always on time and their drivers are extremely professional.",
          author: "David Chen",
          role: "International Consultant",
        },
        "el": {
          quote: "Ως κάποιος που ταξιδεύει συχνά για επαγγελματικούς λόγους, εκτιμώ την αξιοπιστία και την άνεση που παρέχει η Poseidon Transfers. Η υπηρεσία παραλαβής από το αεροδρόμιο είναι πάντα στην ώρα της και οι οδηγοί τους είναι εξαιρετικά επαγγελματίες.",
          author: "David Chen",
          role: "Διεθνής Σύμβουλος",
        }
      },
      rating: 5,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const translatedContent = testimonial.translations[locale];
            if (!translatedContent) return null;
            
            return (
              <TestimonialCard
                key={index}
                quote={translatedContent.quote}
                author={translatedContent.author}
                role={translatedContent.role}
                rating={testimonial.rating}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
