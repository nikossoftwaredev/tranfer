import { tours } from "../../../../lib/data/tours";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

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
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("book.fullName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("book.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("book.date")}
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="passengers"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("book.passengers")}
                  </label>
                  <select
                    id="passengers"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                    required
                  >
                    <option value="" disabled selected>
                      {t("book.selectPassengers")}
                    </option>
                    <option value="1">1 {t("book.passenger")}</option>
                    <option value="2">2 {t("book.passengers")}</option>
                    <option value="3">3 {t("book.passengers")}</option>
                    <option value="4">4 {t("book.passengers")}</option>
                    <option value="5">5 {t("book.passengers")}</option>
                    <option value="6">6 {t("book.passengers")}</option>
                    <option value="7+">7+ {t("book.passengers")}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("book.specialRequests")}
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium rounded-md"
                >
                  {t("book.bookButton")}
                </button>
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
