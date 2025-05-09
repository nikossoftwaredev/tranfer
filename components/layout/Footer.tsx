import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";
import { PHONE_NUMBER, EMAIL } from "../../lib/data/config";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gold-text">Poseidon Transfers</h3>
            <p className="text-secondary-foreground/80 max-w-xs">
              {t("description")}
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
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#fleet"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="/#tours"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-secondary-foreground">
              {t("services")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Athens Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Business Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Guided Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Wedding & Event Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Island & Port Transfers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-secondary-foreground">
              {t("contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-secondary-foreground/80">
                  {PHONE_NUMBER}
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-secondary-foreground/80">{EMAIL}</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">
                  123 Kifisias Avenue, Marousi, Athens 15123, Greece
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/70 text-sm">
            © {currentYear} Poseidon Transfers. {t("rights")}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-sm text-secondary-foreground/70 hover:text-primary"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-secondary-foreground/70 hover:text-primary"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
