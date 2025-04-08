"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Fleet", href: "/#fleet" },
  { name: "Tours", href: "/#tours" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold gold-text">LuxTransfer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/#booking" className="cta-button">
            Book Now
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-foreground"
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

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 md:hidden flex flex-col pt-20 px-6",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary py-2 text-lg font-medium"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#booking"
            className="cta-button mt-4 text-center"
            onClick={toggleMenu}
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
