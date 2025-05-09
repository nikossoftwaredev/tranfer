import { MetadataRoute } from "next";
import { DOMAIN } from "@/lib/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*", "/admin/*"],
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
