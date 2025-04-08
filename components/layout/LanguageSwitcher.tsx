"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const locales = [
  { id: "en-US", name: "English", flag: "🇺🇸" },
  { id: "el", name: "Ελληνικά", flag: "🇬🇷" },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const onSelectChange = (locale: string) => {
    // Get the path without the locale
    const pathWithoutLocale = pathname?.split("/").slice(2).join("/");

    // For the root path
    if (!pathWithoutLocale) {
      router.push(`/${locale}`);
      return;
    }

    // For other paths
    router.push(`/${locale}/${pathWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted transition-colors">
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline-block ml-1">
          {locales.find((loc) => loc.id === currentLocale)?.flag ||
            currentLocale}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.id}
            className={`cursor-pointer ${
              locale.id === currentLocale ? "bg-muted font-semibold" : ""
            }`}
            onClick={() => onSelectChange(locale.id)}
          >
            <span className="mr-2">{locale.flag}</span>
            <span>{locale.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
