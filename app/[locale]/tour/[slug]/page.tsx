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

export default async function TourPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const tour = tours.find((tour) => tour.slug === slug);

  if (!tour) {
    notFound();
  }

  return <TourClient locale={locale} slug={slug} />;
}
