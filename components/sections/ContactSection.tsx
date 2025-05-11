"use client";

import { Phone, Mail, Instagram, Facebook, MapPin, Send, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { PHONE_NUMBER, EMAIL } from "../../lib/data/config";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import SectionHeading from "../ui/SectionHeading";
import { sendTelegramContactMessage } from "../../server_actions/telegram";
import { toast } from "sonner";

const ContactSection = () => {
  const t = useTranslations("Contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send message using the telegram server action
      const result = await sendTelegramContactMessage({
        name: formState.name,
        email: formState.email,
        message: formState.message,
      });

      if (result.success) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you soon.",
        });
        setFormState({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message", {
          description: "Please try again or contact us directly.",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error", {
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionHeading title={t("title")} description={t("description")} className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <Card className="overflow-hidden border border-primary/10">
            <div className="bg-primary text-primary-foreground p-6">
              <h3 className="text-xl font-semibold">{t("title")}</h3>
              <p className="mt-2 text-primary-foreground/80">Get in touch with us</p>
            </div>

            <CardContent className="p-6 space-y-6">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-medium mb-1">{t("athens.phone")}</h4>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-medium mb-1">{t("athens.email")}</h4>
                  <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-muted-foreground">Athens, Greece</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="ml-4">
                  <h4 className="font-medium mb-1">Working Hours</h4>
                  <p className="text-muted-foreground">24/7 - Always available for you</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-3">{t("athens.follow")}</h4>
                <div className="flex space-x-3">
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
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border border-primary/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Send us a message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
