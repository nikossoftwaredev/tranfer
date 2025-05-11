"use client";

import { useTranslations } from "next-intl";
import { Label } from "../../ui/label";
import { Luggage, BabyIcon, Users, FileText, Plane, Car, UserCheck } from "lucide-react";
import { useBookingWizard } from "../../../contexts/BookingWizardContext";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { vehicles } from "../../../lib/data/vehicles";
import { NumberInput } from "../../ui/number-input";
import { Checkbox } from "@radix-ui/react-checkbox";

const TravelPreferencesStep = () => {
  const t = useTranslations("Booking");
  const { formState, updateFormState } = useBookingWizard();
  const isTourBooking = !!formState.selectedTour;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormState({ [name]: value });
  };

  // Handle passengers change
  const handlePassengersChange = (value: number) => {
    updateFormState({ passengers: value.toString() });
  };

  // Handle luggage change
  const handleLuggageChange = (value: number) => {
    updateFormState({ luggage: value.toString() });
  };

  // Handle child seats change
  const handleChildSeatsChange = (value: number) => {
    updateFormState({ childSeats: value.toString() });
  };

  // Handle vehicle selection
  const handleVehicleChange = (value: string) => {
    updateFormState({ selectedVehicle: value });
  };

  // Handle include guide change
  const handleIncludeGuideChange = (checked: boolean) => {
    updateFormState({ includeGuide: checked });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <Label htmlFor="passengers" className="flex items-center gap-2 text-base font-medium">
            <Users className="h-5 w-5 text-primary" />
            {t("form.passengers")}
          </Label>
          <div className="w-full">
            <NumberInput
              id="passengers"
              value={parseInt(formState.passengers || "1")}
              onChange={handlePassengersChange}
              min={1}
              max={15}
              aria-label={t("form.passengers")}
              className="w-full"
              inputClassName="w-full md:w-20"
              buttonClassName="bg-muted hover:bg-muted/80"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="luggage" className="flex items-center gap-2 text-base font-medium">
            <Luggage className="h-5 w-5 text-primary" />
            {t("form.luggage")}
          </Label>
          <div className="w-full">
            <NumberInput
              id="luggage"
              value={parseInt(formState.luggage || "0")}
              onChange={handleLuggageChange}
              min={0}
              max={15}
              aria-label={t("form.luggage")}
              className="w-full"
              inputClassName="w-full md:w-20"
              buttonClassName="bg-muted hover:bg-muted/80"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="childSeats" className="flex items-center gap-2 text-base font-medium">
            <BabyIcon className="h-5 w-5 text-primary" />
            {t("form.childSeat")}
          </Label>
          <div className="w-full">
            <NumberInput
              id="childSeats"
              value={parseInt(formState.childSeats || "0")}
              onChange={handleChildSeatsChange}
              min={0}
              max={3}
              aria-label={t("form.childSeat")}
              className="w-full"
              inputClassName="w-full md:w-20"
              buttonClassName="bg-muted hover:bg-muted/80"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="flightNumber" className="flex items-center gap-2 text-base font-medium">
            <Plane className="h-5 w-5 text-primary" />
            {t("form.flightNumber")}
          </Label>
          <Input
            id="flightNumber"
            name="flightNumber"
            placeholder="e.g. BA1234, LH456"
            value={formState.flightNumber}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {!isTourBooking && (
          <div className="space-y-3">
            <Label htmlFor="selectedVehicle" className="flex items-center gap-2 text-base font-medium">
              <Car className="h-5 w-5 text-primary" />
              {t("form.vehicle")}
            </Label>
            <Select value={formState.selectedVehicle} onValueChange={handleVehicleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("form.selectVehicle")} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.model} value={vehicle.model}>
                    {vehicle.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {isTourBooking && (
        <div className="flex items-start space-x-2">
          <Checkbox id="includeGuide" checked={formState.includeGuide} onCheckedChange={handleIncludeGuideChange} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="includeGuide" className="flex items-center gap-2 text-base font-medium cursor-pointer">
              <UserCheck className="h-5 w-5 text-primary" />
              Include Professional Tour Guide
            </Label>
            <p className="text-sm text-muted-foreground">
              Add a licensed professional guide who will provide detailed historical and cultural commentary
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Label htmlFor="notes" className="flex items-center gap-2 text-base font-medium">
          <FileText className="h-5 w-5 text-primary" />
          {t("form.notes")}
        </Label>
        <Textarea
          id="notes"
          name="notes"
          value={formState.notes}
          onChange={handleChange}
          placeholder={t("form.notesPlaceholder")}
          className="min-h-[120px] w-full"
        />
      </div>
    </div>
  );
};

export default TravelPreferencesStep;
