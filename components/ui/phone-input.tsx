import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Flag } from "lucide-react";

// Common country codes with their flags
const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+30", country: "GR", flag: "🇬🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+20", country: "EG", flag: "🇪🇬" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
];

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  containerClassName?: string;
  value?: string;
  countryCode?: string;
  onChange?: (value: { phone: string; countryCode: string }) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ 
    label, 
    error, 
    containerClassName, 
    className, 
    value = "", 
    countryCode = "+30", 
    onChange,
    ...props 
  }, ref) => {
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode);
    const [phoneNumber, setPhoneNumber] = useState(value);

    const handleCountryCodeChange = (code: string) => {
      setSelectedCountryCode(code);
      if (onChange) {
        onChange({ phone: phoneNumber, countryCode: code });
      }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhone = e.target.value;
      setPhoneNumber(newPhone);
      if (onChange) {
        onChange({ phone: newPhone, countryCode: selectedCountryCode });
      }
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="flex gap-2">
          <Select
            value={selectedCountryCode}
            onValueChange={handleCountryCodeChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Code">
                {countryCodes.find(c => c.code === selectedCountryCode)?.flag || "🌍"} {selectedCountryCode}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            ref={ref}
            className={cn(
              "flex-1",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            value={phoneNumber}
            onChange={handlePhoneChange}
            type="tel"
            {...props}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput"; 