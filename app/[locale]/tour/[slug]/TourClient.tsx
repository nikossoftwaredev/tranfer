"use client";

import { useTranslations } from "next-intl";
import { tours } from "../../../../lib/data/tours";
import BookingWizardSection from "../../../../components/sections/BookingWizardSection";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type TourClientProps = {
  slug: string;
};

const TourClient = ({ slug }: TourClientProps) => {
  const t = useTranslations("Tours.tourDetails");
  const tour = tours.find((tour) => tour.slug === slug);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <h2 className="font-semibold leading-none tracking-tight text-center">Tour Not Found</h2>
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
        <Image src={tour.image} alt={tour.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
            <p className="text-xl">{tour.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Tour Details - Content first, booking form at bottom for all screen sizes */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-16">
          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            <Card className="shadow-md">
              <CardHeader>
                <h2 className="font-semibold leading-none tracking-tight">{t("book.title")}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tour.description}</p>
              </CardContent>
            </Card>

            {tour.highlights && tour.highlights.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <h2 className="font-semibold leading-none tracking-tight">{t("highlights")}</h2>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {tour.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="text-muted-foreground">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {tour.includes && tour.includes.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <h2 className="font-semibold leading-none tracking-tight">{t("includes")}</h2>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {tour.includes.map((item: string, index: number) => (
                      <li key={index} className="text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Section - at the bottom for all screen sizes */}
          <div className="max-w-3xl mx-auto pt-8">
            <BookingWizardSection tourSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourClient;
