import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// We'll create these components next
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "LuxTransfer Greece | Premium Transfer Services",
  description:
    "Luxury private transfer services in Greece with professional drivers. Airport transfers, business travel, private tours, and premium chauffeur services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
