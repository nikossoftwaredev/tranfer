"use client";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

const GoogleReviewsBadge = () => {
  // Replace with your Google Place ID and actual review data
  const placeId = "CZbXqFrb8DANEAI";
  const reviewUrl = `https://search.google.com/local/reviews?placeid=${placeId}`;
  const rating = 5.0;
  const reviewCount = 37;

  return (
    <Link
      href={reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-col bg-[#1a1a1a] text-white rounded-lg p-3.5 hover:bg-[#2a2a2a] transition-all duration-300 min-w-[160px] hover:scale-105 hover:shadow-lg text-center"
    >
      <div className="flex items-center justify-center mb-1.5 w-full">
        <div className="mr-2 flex items-center">
          <Image src="https://cdn.trustindex.io/assets/platform/Google/icon.svg" alt="Google" width={20} height={20} />
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <span className="text-lg font-medium mr-2">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-300">| {reviewCount} reviews</span>
      </div>
    </Link>
  );
};

const TestimonialsSection = () => {
  const t = useTranslations("Testimonials");

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t("description")}</p>

          <div className="flex justify-center items-center">
            <GoogleReviewsBadge />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
