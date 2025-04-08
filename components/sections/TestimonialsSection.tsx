import { Star } from "lucide-react";
import Image from "next/image";

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
  const testimonials = [
    {
      quote:
        "The service was impeccable from start to finish. The driver was professional, the car was immaculate, and the entire experience exceeded my expectations.",
      author: "James Wilson",
      role: "Business Executive",
      rating: 5,
    },
    {
      quote:
        "We booked Poseidon Transfers for our wedding day transportation and couldn&apos;t have been happier. The attention to detail and the luxurious vehicles made our special day even more memorable.",
      author: "Sarah & Michael",
      role: "Newlyweds",
      rating: 5,
    },
    {
      quote:
        "As someone who travels frequently for business, I appreciate the reliability and comfort that Poseidon Transfers provides. Their airport pickup service is always on time and their drivers are extremely professional.",
      author: "David Chen",
      role: "International Consultant",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our valued
            clients have to say about their experience with Poseidon Transfers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
