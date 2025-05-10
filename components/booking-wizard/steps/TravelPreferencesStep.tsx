"use client";

import { useTranslations } from "next-intl";
import { Label } from "../../ui/label";
import { Luggage, BabyIcon, Users, FileText, Plane, Info } from "lucide-react";
import { useBookingWizard } from "../../../contexts/BookingWizardContext";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { vehicles } from "../../../lib/data/vehicles";
import { NumberInput } from "../../ui/number-input";

const TravelPreferencesStep = () => {
  const t = useTranslations("Booking");
  const { formState, updateFormState } = useBookingWizard();

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="passengers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t("form.passengers")}
          </Label>
          <div className="flex justify-center">
            <NumberInput
              id="passengers"
              value={parseInt(formState.passengers || "1")}
              onChange={handlePassengersChange}
              min={1}
              max={15}
              aria-label={t("form.passengers")}
              className="mx-auto"
              inputClassName="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="luggage" className="flex items-center gap-2">
            <Luggage className="h-4 w-4" />
            {t("form.luggage")}
          </Label>
          <div className="flex justify-center">
            <NumberInput
              id="luggage"
              value={parseInt(formState.luggage || "0")}
              onChange={handleLuggageChange}
              min={0}
              max={15}
              aria-label={t("form.luggage")}
              className="mx-auto"
              inputClassName="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="childSeats" className="flex items-center gap-2">
            <BabyIcon className="h-4 w-4" />
            {t("form.childSeat")}
          </Label>
          <div className="flex justify-center">
            <NumberInput
              id="childSeats"
              value={parseInt(formState.childSeats || "0")}
              onChange={handleChildSeatsChange}
              min={0}
              max={3}
              aria-label={t("form.childSeat")}
              className="mx-auto"
              inputClassName="w-20"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="flightNumber" className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            {t("form.flightNumber")}
          </Label>
          <Input
            id="flightNumber"
            name="flightNumber"
            placeholder={t("form.flightNumberPlaceholder")}
            value={formState.flightNumber}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="selectedVehicle" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            {t("form.vehicle")}
          </Label>
          <Select value={formState.selectedVehicle} onValueChange={handleVehicleChange}>
            <SelectTrigger>
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {t("form.notes")}
        </Label>
        <Textarea
          id="notes"
          name="notes"
          value={formState.notes}
          onChange={handleChange}
          placeholder={t("form.notesPlaceholder")}
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default TravelPreferencesStep;
