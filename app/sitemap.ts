import { MetadataRoute } from "next";
import { tours } from "@/lib/data/tours";
import { DOMAIN } from "@/lib/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DOMAIN;
  const lastModified = new Date();

  // Generate tour URLs for each supported locale
  const tourUrls = tours.flatMap((tour) => [
    {
      url: `${baseUrl}/en-US/tour/${tour.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/el/tour/${tour.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  // Add main pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en-US`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/el`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en-US/contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/el/contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...tourUrls];
}
