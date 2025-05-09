"use client";

import { useTranslations } from "next-intl";
import { tours } from "../../../../lib/data/tours";
import BookingWizardSection from "../../../../components/sections/BookingWizardSection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type TourClientProps = {
  locale: string;
  slug: string;
};

const TourClient = ({ locale, slug }: TourClientProps) => {
  const t = useTranslations("Tours.tourDetails");
  const tour = tours.find((tour) => tour.slug === slug);
  const translatedContent = tour?.translations[locale];

  if (!tour || !translatedContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Tour Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">The requested tour could not be found.</p>
            <Button asChild>
              <Link href="/tours">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("back")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={tour.image}
          alt={translatedContent.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              {translatedContent.title}
            </h1>
            <p className="text-xl">{translatedContent.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Tour Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t("book.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {translatedContent.description}
                </p>
              </CardContent>
            </Card>

            {translatedContent.highlights &&
              translatedContent.highlights.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("highlights")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {translatedContent.highlights.map((highlight, index) => (
                        <li key={index} className="text-muted-foreground">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

            {translatedContent.includes &&
              translatedContent.includes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("includes")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {translatedContent.includes.map((item, index) => (
                        <li key={index} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
          </div>

          {/* Booking Section */}
          <div className="md:col-span-1">
            <BookingWizardSection tourSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourClient;
