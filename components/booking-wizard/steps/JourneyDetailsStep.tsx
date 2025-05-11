"use client";

import { useTranslations } from "next-intl";
import { Label } from "../../ui/label";
import { useBookingWizard } from "../../../contexts/BookingWizardContext";
import { LocationAutocomplete } from "../../ui/LocationAutocomplete";
import { PlacePrediction } from "../../../server_actions/googleSearchActions";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";

const JourneyDetailsStep = () => {
  const t = useTranslations("Booking");
  const { formState, updateFormState, validationErrors } = useBookingWizard();
  const isTourBooking = !!formState.selectedTour;

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
    <div className={cn("space-y-6", isTourBooking ? "md:space-y-8" : "")}>
      <div className={`grid grid-cols-1 ${!isTourBooking ? "md:grid-cols-2" : ""} gap-6`}>
        <div className="space-y-2">
          <Label htmlFor="pickupLocation" className="text-base font-medium flex items-center">
            {isTourBooking ? "Your Pickup Location" : t("form.pickupLabel")}
            <span className="ml-1 text-primary font-medium">*</span>
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

        {!isTourBooking && (
          <div className="space-y-2">
            <Label htmlFor="dropoffLocation" className="text-base font-medium flex items-center">
              {t("form.dropoff")}
              <span className="ml-1 text-primary font-medium">*</span>
            </Label>
            <div className={validationErrors.dropoffLocation ? "border-rose-300 rounded-md" : ""}>
              <LocationAutocomplete value={formState.dropoffLocation} onChange={handleDropoffLocationChange} />
            </div>
            {validationErrors.dropoffLocation && (
              <p className="text-rose-400 text-sm mt-1">{validationErrors.dropoffLocation}</p>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-base font-medium flex items-center">
            {t("form.date")}
            <span className="ml-1 text-primary font-medium">*</span>
          </Label>
          <DatePicker date={formState.date || new Date()} setDate={handleDateChange} placeholder="Select date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-base font-medium flex items-center">
            {t("form.time")}
            <span className="ml-1 text-primary font-medium">*</span>
          </Label>
          <TimePicker value={formState.time} onChange={handleTimeChange} />
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailsStep;
