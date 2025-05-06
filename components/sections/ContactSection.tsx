"use client";

import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";

const ContactSection = () => {
  const t = useTranslations("Contact");

  // Initialize react-hook-form

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-primary/5 rounded-lg p-8 border border-primary/10 mb-8">
              <h3 className="text-xl font-semibold mb-6">
                {t("athens.title")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium mb-1">{t("athens.phone")}</h4>
                    <p className="text-muted-foreground">+30 210 123-4567</p>
                    <p className="text-muted-foreground">
                      +30 694 567-8901{" "}
                      <span className="hidden sm:inline">(WhatsApp)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium mb-1">{t("athens.email")}</h4>
                    <div className="space-y-2">
                      <a
                        href="mailto:info@poseidontransfers.gr"
                        className="text-foreground/80 hover:text-primary transition-colors block"
                      >
                        info@poseidontransfers.gr
                      </a>
                      <a
                        href="mailto:bookings@poseidontransfers.gr"
                        className="text-foreground/80 hover:text-primary transition-colors block"
                      >
                        bookings@poseidontransfers.gr
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium mb-1">{t("athens.address")}</h4>
                    <p className="text-muted-foreground">
                      123 Kifisias Avenue
                      <br />
                      Marousi, Athens 15123
                      <br />
                      Greece
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-2">{t("athens.follow")}</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
