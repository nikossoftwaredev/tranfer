"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import Image from "next/image";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactSection = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact Our Greek Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our Greek transportation services? Get in touch
            with our team, and we&apos;ll be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-primary/5 rounded-lg p-8 border border-primary/10 mb-8">
              <h3 className="text-xl font-semibold mb-6">
                Athens Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground">+30 210 123-4567</p>
                    <p className="text-muted-foreground">
                      +30 694 567-8901 (WhatsApp)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      info@luxtransfer-greece.com
                    </p>
                    <p className="text-muted-foreground">
                      bookings@luxtransfer-greece.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium mb-1">Address</h4>
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
                <h4 className="font-medium mb-2">Follow Us</h4>
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

            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-border h-72 w-full">
              <div className="relative h-full w-full">
                <Image
                  src="/images/athens-map.jpg"
                  alt="Athens Office Location"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg text-center max-w-xs">
                    <p className="font-medium mb-1">Athens Office</p>
                    <p className="text-sm text-muted-foreground">
                      Central location near Athens International Airport with
                      easy access to all major destinations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-lg border border-border p-8">
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for your message. Our Greek team will get back to
                  you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="text-primary font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1"
                  >
                    Subject*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium rounded-md relative"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="opacity-0">Send Message</span>
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
