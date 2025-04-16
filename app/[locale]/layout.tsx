import "./globals.css";
import "react-day-picker/dist/style.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import type { Metadata } from "next";
import { Toaster } from "../../components/ui/toaster";
import { VehicleProvider } from "../../contexts/VehicleContext";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
    metadataBase: new URL("https://poseidontranfer.vercel.app"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://poseidontranfer.vercel.app",
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
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VehicleProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </VehicleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
