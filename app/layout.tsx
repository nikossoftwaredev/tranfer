import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poseidon Transfers | Premium Transportation Services in Greece",
  description:
    "Experience luxury transportation across Greece with Poseidon Transfers. Professional chauffeurs, premium fleet, and personalized service.",
  metadataBase: new URL("https://poseidontranfer.vercel.app"),
  openGraph: {
    title: "Poseidon Transfers | Premium Transportation Services in Greece",
    description:
      "Experience luxury transportation across Greece with Poseidon Transfers. Professional chauffeurs, premium fleet, and personalized service.",
    url: "https://poseidontranfer.vercel.app",
    siteName: "Poseidon Transfers",
    images: [
      {
        url: "/images/hero-greece.jpg",
        width: 1920,
        height: 1080,
        alt: "Luxury Transfer Services in Greece",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poseidon Transfers | Premium Transportation Services in Greece",
    description:
      "Experience luxury transportation across Greece with Poseidon Transfers. Professional chauffeurs, premium fleet, and personalized service.",
    images: ["/images/hero-greece.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
