import "./globals.css";
import "react-day-picker/dist/style.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { VehicleProvider } from "../../contexts/VehicleContext";
import WhatsAppButton from "../../components/ui/WhatsAppButton";
import { DOMAIN, PHONE_NUMBER } from "@/lib/data/config";
import Script from "next/script";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Define viewport export for the layout
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E293B",
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  // Ensure locale is one of the supported locales
  const typedLocale = locale as (typeof routing.locales)[number];
  const t = await getTranslations({
    locale: typedLocale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(DOMAIN),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: DOMAIN,
      siteName: t("siteName"),
      images: [
        {
          url: "/images/hero-greece.jpg",
          width: 1920,
          height: 1080,
          alt: t("imageAlt"),
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/hero-greece.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <head>
        {/* Add preconnect for faster loading of external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Add preload for critical resources */}
        <link rel="preload" href="/images/hero-greece.jpg" as="image" />
      </head>
      {/* Google Ads Conversion Tracking */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17068303985" strategy="afterInteractive" />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17068303985');
        `}
      </Script>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VehicleProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton phoneNumber={PHONE_NUMBER} />
            <Toaster theme="dark" position="bottom-right" richColors />
          </VehicleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
