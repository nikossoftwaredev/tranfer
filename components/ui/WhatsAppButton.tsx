"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { cn } from "../../lib/utils";

type WhatsAppButtonProps = {
  phoneNumber: string;
};

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  const t = useTranslations("Contact");
  const [isVisible, setIsVisible] = useState(false);

  // Add a small delay before showing the button for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Format the phone number to ensure it's in the correct format for WhatsApp
  // Remove all non-numeric characters
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${formattedPhoneNumber}?text=Hello, I would like to book a transfer.`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg z-50 transition-all duration-300",
        "hover:bg-green-600 hover:shadow-xl hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
        "active:scale-95",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-xl" />
      <span className="font-medium hidden md:inline">{t("whatsapp.chat")}</span>
    </a>
  );
};

export default WhatsAppButton;
