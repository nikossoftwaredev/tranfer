import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../../lib/utils";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "../../i18n/routing";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "en-US" }, { locale: "el" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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

export default async function RootLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
