"use client";

import { useTranslations } from "next-intl";
import { Label } from "../../ui/label";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useBookingWizard } from "../../../contexts/BookingWizardContext";
import { DatePicker } from "../../ui/date-picker";
import { TimePicker } from "../../ui/time-picker";
import { LocationAutocomplete } from "../../ui/LocationAutocomplete";
import { PlacePrediction } from "../../../server_actions/googleSearchActions";

const JourneyDetailsStep = () => {
  const t = useTranslations("Booking");
  const { formState, updateFormState, validationErrors } = useBookingWizard();

  // Handle date changes
  const handleDateChange = (date: Date | undefined) => {
    updateFormState({ date });
  };

  // Handle time changes
  const handleTimeChange = (time: string) => {
    updateFormState({ time });
  };

  // Handle pickup location changes
  const handlePickupLocationChange = (value: PlacePrediction & { coordinates?: { lat: number; lng: number } }) => {
    updateFormState({ pickupLocation: value });
  };

  // Handle dropoff location changes
  const handleDropoffLocationChange = (value: PlacePrediction & { coordinates?: { lat: number; lng: number } }) => {
    updateFormState({ dropoffLocation: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pickupLocation" className="flex items-center gap-2 text-base font-medium">
            <MapPin className="h-5 w-5 text-primary" />
            {t("form.pickupLabel")}
          </Label>
          <div className={validationErrors.pickupLocation ? "border-rose-300 rounded-md" : ""}>
            <LocationAutocomplete
              value={formState.pickupLocation}
              onChange={handlePickupLocationChange}
              isPickupLocation
            />
          </div>
          {validationErrors.pickupLocation && (
            <p className="text-rose-400 text-sm mt-1">{validationErrors.pickupLocation}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoffLocation" className="flex items-center gap-2 text-base font-medium">
            <MapPin className="h-5 w-5 text-primary" />
            {t("form.dropoff")}
          </Label>
          <div className={validationErrors.dropoffLocation ? "border-rose-300 rounded-md" : ""}>
            <LocationAutocomplete value={formState.dropoffLocation} onChange={handleDropoffLocationChange} />
          </div>
          {validationErrors.dropoffLocation && (
            <p className="text-rose-400 text-sm mt-1">{validationErrors.dropoffLocation}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2 text-base font-medium">
            <Calendar className="h-5 w-5 text-primary" />
            {t("form.date")}
          </Label>
          <div className={validationErrors.date ? "border-rose-300 rounded-md" : ""}>
            <DatePicker date={formState.date || new Date()} setDate={handleDateChange} placeholder={t("form.date")} />
          </div>
          {validationErrors.date && <p className="text-rose-400 text-sm mt-1">{validationErrors.date}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2 text-base font-medium">
            <Clock className="h-5 w-5 text-primary" />
            {t("form.time")}
          </Label>
          <TimePicker value={formState.time} onChange={handleTimeChange} label={t("form.time")} />
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailsStep;
