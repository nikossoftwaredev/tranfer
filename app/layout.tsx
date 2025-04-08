import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// We'll create these components next
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const robotoFont = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Private Transfers | Professional Car Service",
  description:
    "Luxury private transfer services with professional drivers. Airport transfers, business travel, private tours, and premium chauffeur services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoFont.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
