"use client";

import { tours } from "../../../../lib/data/tours";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DatePicker } from "../../../../components/ui/date-picker";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { Select } from "../../../../components/ui/select";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type PageProps = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((tour) => tour.slug === slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: `${tour.title} | Poseidon Transfers`,
    description: tour.subtitle,
    openGraph: {
      images: [tour.image],
    },
  };
}

export async function generateStaticParams() {
  return tours.flatMap((tour) => [
    { locale: "en-US", slug: tour.slug },
    { locale: "el", slug: tour.slug },
  ]);
}

export default function TourPage({ params }: PageProps) {
  const t = useTranslations("Tours.tourDetails");
  const { locale, slug } = params;
  const tour = tours.find((tour) => tour.slug === slug);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  if (!tour) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {tour.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">{tour.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Link
          href={`/${locale}/#tours`}
          className="flex items-center text-primary mb-8 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("back")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Tour Details */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8">
              <div className="bg-primary/10 px-4 py-2 rounded-full flex items-center mr-4">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">
                  {tour.hours} {useTranslations("Tours")("hours")}
                </span>
              </div>
              <div className="text-2xl font-bold text-primary">
                €{tour.cost}
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {tour.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Tour Highlights */}
            {tour.highlights && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t("highlights")}</h2>
                <ul className="space-y-2">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-1" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            {tour.includes && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("includes")}</h2>
                <ul className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">{t("book.title")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("book.description")}
              </p>

              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("book.fullName")}</Label>
                  <Input type="text" id="name" required />
                </div>

                <div>
                  <Label htmlFor="email">{t("book.email")}</Label>
                  <Input type="email" id="email" required />
                </div>

                <div>
                  <Label htmlFor="date">{t("book.date")}</Label>
                  <DatePicker
                    date={selectedDate}
                    setDate={setSelectedDate}
                    placeholder={t("book.date")}
                  />
                </div>

                <div>
                  <Label htmlFor="passengers">{t("book.passengers")}</Label>
                  <Select
                    options={[
                      { value: "", label: t("book.selectPassengers") },
                      { value: "1", label: `1 ${t("book.passenger")}` },
                      { value: "2", label: `2 ${t("book.passengers")}` },
                      { value: "3", label: `3 ${t("book.passengers")}` },
                      { value: "4", label: `4 ${t("book.passengers")}` },
                      { value: "5", label: `5 ${t("book.passengers")}` },
                      { value: "6", label: `6 ${t("book.passengers")}` },
                      { value: "7+", label: `7+ ${t("book.passengers")}` },
                    ]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">{t("book.specialRequests")}</Label>
                  <Textarea id="notes" rows={3} />
                </div>

                <Button type="submit" className="w-full">
                  {t("book.bookButton")}
                </Button>
              </form>

              <div className="mt-6 text-sm text-muted-foreground text-center">
                <p>
                  {t("book.customize")}{" "}
                  <Link
                    href={`/${locale}/#contact`}
                    className="text-primary hover:underline"
                  >
                    {t("book.contactUs")}
                  </Link>{" "}
                  {t("book.directly")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
