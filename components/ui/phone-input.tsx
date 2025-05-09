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

// Common country codes
const countryCodes = [
  { code: "+1" },
  { code: "+44" },
  { code: "+30" },
  { code: "+49" },
  { code: "+33" },
  { code: "+39" },
  { code: "+34" },
  { code: "+31" },
  { code: "+7" },
  { code: "+86" },
  { code: "+81" },
  { code: "+82" },
  { code: "+91" },
  { code: "+61" },
  { code: "+55" },
  { code: "+52" },
  { code: "+27" },
  { code: "+20" },
  { code: "+971" },
  { code: "+65" },
];

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  containerClassName?: string;
  value?: string;
  countryCode?: string;
  onChange?: (value: { phone: string; countryCode: string }) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      error,
      containerClassName,
      className,
      value = "",
      countryCode = "+30",
      onChange,
      ...props
    },
    ref
  ) => {
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode);
    const [phoneNumber, setPhoneNumber] = useState(value);

    const handleCountryCodeChange = (code: string) => {
      setSelectedCountryCode(code);
      if (onChange) {
        onChange({ phone: phoneNumber, countryCode: code });
      }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Limit to digits only and max 10 characters
      const newPhone = e.target.value.replace(/[^\d]/g, "").slice(0, 10);
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
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Code">
                {selectedCountryCode}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[180px]">
              {countryCodes.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.code}
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
