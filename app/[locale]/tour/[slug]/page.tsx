import { tours } from "../../../../lib/data/tours";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TourClient from "./TourClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const tour = tours.find((tour) => tour.slug === slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  // Access translations based on locale, fallback to en-US if not available
  const translationLocale = tour.translations[locale] ? locale : "en-US";
  const translation = tour.translations[translationLocale];

  return {
    title: `${translation.title} | Poseidon Transfers`,
    description: translation.subtitle,
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

export default async function TourPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const tour = tours.find((tour) => tour.slug === slug);

  if (!tour) {
    notFound();
  }

  return <TourClient locale={locale} slug={slug} />;
}
