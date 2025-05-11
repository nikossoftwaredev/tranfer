import { tours } from "../../../../lib/data/tours";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TourClient from "./TourClient";
import { DOMAIN } from "@/lib/data/config";

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

  // Create a more descriptive title and description
  const title = `${tour.title} | Private Tour from Athens`;
  const description = `Experience ${
    tour.title
  } with our private guided tour from Athens. Professional driver, luxury vehicle, includes ${
    tour.includes?.[0] || "personalized service"
  }. Book now!`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [tour.image],
      url: `${DOMAIN}/${locale}/tour/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
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
  const { slug } = await params;
  const tour = tours.find((tour) => tour.slug === slug);

  if (!tour) {
    notFound();
  }

  return <TourClient slug={slug} />;
}
