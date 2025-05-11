"use client";

import { useTranslations } from "next-intl";
import { PhoneInput } from "../../ui/phone-input";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { User, Mail, Phone, IdCard } from "lucide-react";
import { useBookingWizard } from "../../../contexts/BookingWizardContext";
import { useMemo } from "react";
import { InputWithIcon } from "../../ui/input-with-icon";

const PersonalInfoStep = () => {
  const t = useTranslations("Booking");
  const { formState, updateFormState, validationErrors } = useBookingWizard();

  // Display selected tour if available
  const selectedTourSection = useMemo(() => {
    if (!formState.selectedTour) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
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
          <Label htmlFor="fullName" className="text-base font-medium">
            {t("form.fullName")} <span className="text-primary">*</span>
          </Label>
          <InputWithIcon
            id="fullName"
            name="fullName"
            value={formState.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
            icon={<User className="h-5 w-5 text-primary" />}
            className={`w-full ${validationErrors.fullName ? "border-rose-300" : ""}`}
          />
          {validationErrors.fullName && <p className="text-rose-400 text-sm mt-1">{validationErrors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium">
            {t("form.email")} <span className="text-primary">*</span>
          </Label>
          <InputWithIcon
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            type="email"
            autoComplete="email"
            required
            icon={<Mail className="h-5 w-5 text-primary" />}
            className={`w-full ${validationErrors.email ? "border-rose-300" : ""}`}
          />
          {validationErrors.email && <p className="text-rose-400 text-sm mt-1">{validationErrors.email}</p>}
        </div>

        {/* Phone number - now in left column on desktop */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-medium">
            {t("form.phone")} <span className="text-primary">*</span>
          </Label>
          <PhoneInput
            id="phone"
            name="phone"
            value={formState.phone}
            countryCode={formState.countryCode}
            onChange={handlePhoneChange}
            required
            className={validationErrors.phone ? "border-rose-300" : ""}
            icon={<Phone className="h-5 w-5 text-primary" />}
          />
          {validationErrors.phone && <p className="text-rose-400 text-sm mt-1">{validationErrors.phone}</p>}
        </div>

        {/* Passport field (optional) - now in right column on desktop */}
        <div className="space-y-2">
          <Label htmlFor="passport" className="text-base font-medium">
            {t("form.passport")}
          </Label>
          <InputWithIcon
            id="passport"
            name="passport"
            value={formState.passport}
            onChange={handleChange}
            placeholder={t("form.passportPlaceholder")}
            icon={<IdCard className="h-5 w-5 text-primary" />}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
