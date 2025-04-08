import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  // Ensure locale is one of the supported locales
  const locale = params.locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale, namespace: "Metadata" });

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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
