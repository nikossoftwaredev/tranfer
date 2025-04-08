import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poseidon Transfer | Premium Transportation Services in Greece",
  description:
    "Experience luxury transportation across Greece with Poseidon Transfer. Professional chauffeurs, premium fleet, and personalized service.",
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
