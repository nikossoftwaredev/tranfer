"use client";

import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

const ContactSection = () => {
  const t = useTranslations("Contact");
  const { toast } = useToast();

  // Define form schema with Zod
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    subject: z.string().min(3, {
      message: "Subject must be at least 3 characters.",
    }),
    message: z.string().min(10, {
      message: "Message must be at least 10 characters.",
    }),
  });

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Simulate form submission with the form data
    console.log("Form submitted with:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success toast
    toast({
      variant: "success",
      title: t("form.title"),
      description:
        "Your message has been sent successfully. We will get back to you soon.",
    });

    // Reset form
    form.reset();
  };

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
                      +30 694 567-8901 (WhatsApp)
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
          <div className="bg-background rounded-lg p-8 border border-border">
            <h3 className="text-xl font-semibold mb-6">{t("form.title")}</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.fullName")}</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.subject")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Booking Inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.message")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("form.submit")}
                    </>
                  ) : (
                    t("form.submit")
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
