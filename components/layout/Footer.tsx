import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const translations = {
    "en-US": {
      companyDescription: "Luxury private transfer services throughout Greece with professional drivers. Experience premium transportation tailored to your Greek adventure.",
      quickLinks: "Quick Links",
      home: "Home",
      services: "Services",
      fleet: "Our Fleet",
      tours: "Greek Tours",
      about: "About Us",
      ourServices: "Our Services",
      airportTransfers: "Athens Airport Transfers",
      businessTravel: "Business Travel",
      guidedTours: "Greek Guided Tours",
      weddingTransfers: "Wedding & Event Transfers",
      islandTransfers: "Island & Port Transfers",
      contactUs: "Contact Us",
      phone: "+30 210 123-4567",
      email: "info@poseidontransfer.gr",
      address: "123 Kifisias Avenue, Marousi, Athens 15123, Greece",
      copyright: "© {year} Poseidon Transfers. All rights reserved.",
      privacyPolicy: "Privacy Policy",
      terms: "Terms & Conditions"
    },
    "el": {
      companyDescription: "Υπηρεσίες πολυτελών ιδιωτικών μεταφορών σε όλη την Ελλάδα με επαγγελματίες οδηγούς. Ζήστε μια premium εμπειρία μεταφοράς προσαρμοσμένη στην ελληνική περιπέτειά σας.",
      quickLinks: "Γρήγοροι Σύνδεσμοι",
      home: "Αρχική",
      services: "Υπηρεσίες",
      fleet: "Στόλος",
      tours: "Ελληνικά Τουρ",
      about: "Σχετικά",
      ourServices: "Οι Υπηρεσίες μας",
      airportTransfers: "Μεταφορές Αεροδρομίου",
      businessTravel: "Επαγγελματικά Ταξίδια",
      guidedTours: "Οργανωμένα Τουρ",
      weddingTransfers: "Μεταφορές Γάμου & Εκδηλώσεων",
      islandTransfers: "Μεταφορές Νησιών & Λιμανιών",
      contactUs: "Επικοινωνία",
      phone: "+30 210 123-4567",
      email: "info@poseidontransfer.gr",
      address: "Λεωφόρος Κηφισίας 123, Μαρούσι, Αθήνα 15123, Ελλάδα",
      copyright: "© {year} Poseidon Transfers. Όλα τα δικαιώματα διατηρούνται.",
      privacyPolicy: "Πολιτική Απορρήτου",
      terms: "Όροι & Προϋποθέσεις"
    }
  };

  const currentTranslations = translations[locale];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gold-text">Poseidon Transfers</h3>
            <p className="text-secondary-foreground/80 max-w-xs">
              {currentTranslations.companyDescription}
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-secondary-foreground/80 hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-secondary-foreground/80 hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-secondary-foreground">
              {currentTranslations.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.services}
                </Link>
              </li>
              <li>
                <Link
                  href="/#fleet"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.fleet}
                </Link>
              </li>
              <li>
                <Link
                  href="/#tours"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.tours}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-secondary-foreground">
              {currentTranslations.ourServices}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.airportTransfers}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.businessTravel}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.guidedTours}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.weddingTransfers}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {currentTranslations.islandTransfers}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-secondary-foreground">
              {currentTranslations.contactUs}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-secondary-foreground/80">
                  {currentTranslations.phone}
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-secondary-foreground/80">
                  {currentTranslations.email}
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">
                  {currentTranslations.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/70 text-sm">
            {currentTranslations.copyright.replace("{year}", currentYear.toString())}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-sm text-secondary-foreground/70 hover:text-primary"
            >
              {currentTranslations.privacyPolicy}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-secondary-foreground/70 hover:text-primary"
            >
              {currentTranslations.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
