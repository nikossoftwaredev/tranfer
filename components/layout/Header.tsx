"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en-US";
  const t = useTranslations("Navigation");

  const navItems = [
    { name: t("home"), href: `/${locale}` },
    { name: t("services"), href: `/${locale}/#services` },
    { name: t("fleet"), href: `/${locale}/#fleet` },
    { name: t("tours"), href: `/${locale}/#tours` },
    { name: t("about"), href: `/${locale}/#about` },
    { name: t("contact"), href: `/${locale}/#contact` },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Close menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // If it's a hash link, scroll to the section
    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header height
          behavior: "smooth",
        });
      } else {
        // If element not found, navigate normally
        router.push(href);
      }
    } else {
      // For non-hash links, use normal navigation
      router.push(href);
    }
  };

  return (
    <header className="w-full bg-[#121212] md:bg-card/80 md:backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Logo onClick={(e) => handleNavClick(e, `/${locale}`)} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors font-medium nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={`/${locale}/#booking`}
            className="cta-button"
            onClick={(e) => handleNavClick(e, `/${locale}/#booking`)}
          >
            {t("bookNow")}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <button
            className="text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-card z-40 md:hidden flex flex-col pt-20 px-6",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        {/* Close button for mobile menu */}
        <button
          className="absolute top-6 right-4 text-foreground"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary py-2 text-lg font-medium nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={`/${locale}/#booking`}
            className="cta-button mt-4 text-center"
            onClick={(e) => handleNavClick(e, `/${locale}/#booking`)}
          >
            {t("bookNow")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
