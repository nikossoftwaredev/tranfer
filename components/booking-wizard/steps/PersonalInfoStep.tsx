"use client";

import { useTranslations } from "next-intl";
import { PhoneInput } from "../../ui/phone-input";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { User, Mail, Phone, IdCard } from "lucide-react";
import { useBookingWizard } from "../../../contexts/BookingWizardContext";
import { useMemo } from "react";

const PersonalInfoStep = () => {
  const t = useTranslations("Booking");
  const { formState, updateFormState, validationErrors } = useBookingWizard();

  // Display selected tour if available
  const selectedTourSection = useMemo(() => {
    if (!formState.selectedTour) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
          <User className="h-5 w-5" />
          {t("form.title")}
        </h4>
        <div className="space-y-2">
          <Input id="selectedTour" name="selectedTour" value={formState.selectedTour} disabled className="bg-muted" />
        </div>
      </div>
    );
  }, [formState.selectedTour, t]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormState({ [name]: value });
  };

  // Handle phone changes
  const handlePhoneChange = (value: { phone: string; countryCode: string }) => {
    updateFormState({
      phone: value.phone,
      countryCode: value.countryCode,
    });
  };

  return (
    <div className="space-y-6">
      {/* Tour Selection (if on tour page) */}
      {selectedTourSection}

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("form.fullName")}
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formState.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
            className={`w-full ${validationErrors.fullName ? "border-red-500" : ""}`}
          />
          {validationErrors.fullName && <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {t("form.email")}
          </Label>
          <Input
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            type="email"
            autoComplete="email"
            required
            className={`w-full ${validationErrors.email ? "border-red-500" : ""}`}
          />
          {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
        </div>

        {/* Phone number - now in left column on desktop */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {t("form.phone")}
          </Label>
          <PhoneInput
            id="phone"
            name="phone"
            value={formState.phone}
            countryCode={formState.countryCode}
            onChange={handlePhoneChange}
            required
            className={validationErrors.phone ? "border-red-500" : ""}
          />
          {validationErrors.phone && <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>}
        </div>

        {/* Passport field (optional) - now in right column on desktop */}
        <div className="space-y-2">
          <Label htmlFor="passport" className="flex items-center gap-2">
            <IdCard className="h-4 w-4" />
            {t("form.passport")}
          </Label>
          <Input
            id="passport"
            name="passport"
            value={formState.passport}
            onChange={handleChange}
            placeholder={t("form.passportPlaceholder")}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
