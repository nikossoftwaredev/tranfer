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
  const { formState, updateFormState } = useBookingWizard();

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
          <Label htmlFor="pickupLocation" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t("form.pickupLabel")}
          </Label>
          <LocationAutocomplete
            value={formState.pickupLocation}
            onChange={handlePickupLocationChange}
            isPickupLocation
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoffLocation" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t("form.dropoff")}
          </Label>
          <LocationAutocomplete value={formState.dropoffLocation} onChange={handleDropoffLocationChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t("form.date")}
          </Label>
          <DatePicker date={formState.date || new Date()} setDate={handleDateChange} placeholder={t("form.date")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t("form.time")}
          </Label>
          <TimePicker value={formState.time} onChange={handleTimeChange} label={t("form.time")} />
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailsStep;
