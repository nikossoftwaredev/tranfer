"use client";

import { useState, useCallback, useMemo } from "react";
import { InputWithIcon } from "../ui/input-with-icon";
import { PhoneInput } from "../ui/phone-input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/date-picker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslations, useLocale } from "next-intl";
import { useVehicle } from "../../contexts/VehicleContext";
import { LocationAutocomplete } from "../ui/LocationAutocomplete";
import { LocationOption } from "../ui/LocationAutocomplete";
import { useToast } from "../../hooks/use-toast";
import { sendTelegramMessage } from "../../server_actions/telegram";
import { tours } from "../../lib/data/tours";
import { vehicles } from "../../lib/data/vehicles";
import {
  Luggage,
  BabyIcon,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Users,
  FileText,
  Plane,
  Info,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TimePicker } from "../ui/time-picker";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  pickupLocation: LocationOption | undefined;
  dropoffLocation: LocationOption | undefined;
  date: Date | undefined;
  time: string;
  passengers: string;
  luggage: string;
  childSeats: string;
  flightNumber: string;
  notes: string;
  selectedTour: string;
};

const BookingSection = ({ tourSlug }: { tourSlug?: string }) => {
  const t = useTranslations("Booking");
  const { selectedVehicle, setSelectedVehicle } = useVehicle();
  const { toast } = useToast();
  const locale = useLocale();

  // Find the tour if tourSlug is provided - memoize this calculation
  const selectedTour = useMemo(
    () => (tourSlug ? tours.find((tour) => tour.slug === tourSlug) : undefined),
    [tourSlug]
  );

  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+30",
    pickupLocation: undefined,
    dropoffLocation: undefined,
    date: undefined,
    time: "12:00",
    passengers: "1",
    luggage: "0",
    childSeats: "0",
    flightNumber: "",
    notes: "",
    selectedTour: selectedTour?.translations[locale]?.title || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handlePhoneChange = useCallback(
    (value: { phone: string; countryCode: string }) => {
      setFormState((prev) => ({
        ...prev,
        phone: value.phone,
        countryCode: value.countryCode,
      }));
    },
    []
  );

  const handleDateChange = useCallback((date: Date | undefined) => {
    setFormState((prev) => ({
      ...prev,
      date,
    }));
  }, []);

  const handleTimeChange = useCallback((time: string) => {
    setFormState((prev) => ({
      ...prev,
      time,
    }));
  }, []);

  const handlePickupLocationChange = useCallback((value: LocationOption) => {
    setFormState((prev) => ({
      ...prev,
      pickupLocation: value,
    }));
  }, []);

  const handleDropoffLocationChange = useCallback((value: LocationOption) => {
    setFormState((prev) => ({
      ...prev,
      dropoffLocation: value,
    }));
  }, []);

  const handlePassengersChange = useCallback((value: string) => {
    setFormState((prev) => ({
      ...prev,
      passengers: value,
    }));
  }, []);

  const handleLuggageChange = useCallback((value: string) => {
    setFormState((prev) => ({
      ...prev,
      luggage: value,
    }));
  }, []);

  const handleChildSeatsChange = useCallback((value: string) => {
    setFormState((prev) => ({
      ...prev,
      childSeats: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Format ISO datetime string for clarity across timezones
      let isoDateTime = "Not specified";

      if (formState.date) {
        const dateObj = new Date(formState.date);

        // If time is also provided, parse and add it to the date
        if (formState.time) {
          const [hours, minutes] = formState.time.split(":").map(Number);
          dateObj.setHours(hours, minutes);
        }

        isoDateTime = dateObj.toISOString();
      }

      // Extract coordinates from locations if available
      const pickupCoordinates = formState.pickupLocation?.coordinates
        ? `${formState.pickupLocation.coordinates.lat},${formState.pickupLocation.coordinates.lng}`
        : "Not available";

      const dropoffCoordinates = formState.dropoffLocation?.coordinates
        ? `${formState.dropoffLocation.coordinates.lat},${formState.dropoffLocation.coordinates.lng}`
        : "Not available";

      try {
        // Send form data to Telegram
        await sendTelegramMessage({
          ...formState,
          phone: formState.phone,
          vehicle: selectedVehicle || "Not specified",
          pickupLocation: {
            ...formState.pickupLocation,
            label: formState.pickupLocation?.name || "Not specified",
            value: formState.pickupLocation?.uniqueKey || "Not specified",
            description:
              formState.pickupLocation?.description || "Not specified",
            coordinates: pickupCoordinates,
          },
          dropoffLocation: {
            ...formState.dropoffLocation,
            label: formState.dropoffLocation?.name || "Not specified",
            value: formState.dropoffLocation?.uniqueKey || "Not specified",
            description:
              formState.dropoffLocation?.description || "Not specified",
            coordinates: dropoffCoordinates,
          },
          isoDateTime: isoDateTime,
          bookingType: selectedTour ? "Tour Booking" : "Transfer",
        });

        toast({
          variant: "default",
          title: t("success.title"),
          description: t("success.message"),
        });

        // Reset form fields after successful submission
        setFormState((prev) => ({
          ...prev,
          fullName: "",
          email: "",
          phone: "",
          countryCode: "+30",
          pickupLocation: undefined,
          dropoffLocation: undefined,
          flightNumber: "",
          notes: "",
        }));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "There was a problem submitting your request. Please try again later or contact us directly.",
        });
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, selectedVehicle, selectedTour, t, toast]
  );

  // Memoize the tour section to prevent unnecessary re-renders
  const tourSection = useMemo(() => {
    if (!selectedTour) return null;

    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Selected Tour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input
              id="selectedTour"
              name="selectedTour"
              value={formState.selectedTour}
              disabled
              className="bg-muted"
            />
          </div>
        </CardContent>
      </Card>
    );
  }, [selectedTour, formState.selectedTour]);

  return (
    <section id="booking" className="section-padding bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-background/80 backdrop-blur-sm border-2">
            <CardHeader className="text-center pb-2"></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tour Selection (if on tour page) */}
                {tourSection}

                {/* Personal Information */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputWithIcon
                      id="fullName"
                      name="fullName"
                      label={t("form.fullName")}
                      value={formState.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      icon={<User className="h-4 w-4" />}
                    />
                    <InputWithIcon
                      id="email"
                      name="email"
                      label={t("form.email")}
                      value={formState.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      required
                      icon={<Mail className="h-4 w-4" />}
                    />
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2"
                      >
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
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Trip Details */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Journey Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="pickupLocation"
                          className="flex items-center gap-2"
                        >
                          <MapPin className="h-4 w-4" />
                          {t("form.pickupLabel")}
                        </Label>
                        <LocationAutocomplete
                          value={formState.pickupLocation}
                          onChange={handlePickupLocationChange}
                          isPickupLocation={true}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="dropoffLocation"
                          className="flex items-center gap-2"
                        >
                          <MapPin className="h-4 w-4" />
                          {t("form.dropoff")}
                        </Label>
                        <LocationAutocomplete
                          value={formState.dropoffLocation}
                          onChange={handleDropoffLocationChange}
                          isPickupLocation={false}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="date"
                          className="flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4" />
                          {t("form.date")}
                        </Label>
                        <DatePicker
                          date={formState.date || new Date()}
                          setDate={handleDateChange}
                          placeholder={t("form.date")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="time"
                          className="flex items-center gap-2"
                        >
                          <Clock className="h-4 w-4" />
                          {t("form.time")}
                        </Label>
                        <TimePicker
                          value={formState.time}
                          onChange={handleTimeChange}
                          label={t("form.time")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Details */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Travel Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="passengers"
                          className="flex items-center gap-2"
                        >
                          <Users className="h-4 w-4" />
                          {t("form.passengers")}
                        </Label>
                        <Select
                          value={formState.passengers}
                          onValueChange={handlePassengersChange}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("form.selectPassengers")}
                            />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {[...Array(10)].map((_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1}
                              </SelectItem>
                            ))}
                            <SelectItem value="11+">11+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="luggage"
                          className="flex items-center gap-2"
                        >
                          <Luggage className="h-4 w-4" />
                          {t("form.luggage")}
                        </Label>
                        <Select
                          value={formState.luggage}
                          onValueChange={handleLuggageChange}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("form.luggagePlaceholder")}
                            />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <SelectItem value="0">0</SelectItem>
                            {[...Array(9)].map((_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1}
                              </SelectItem>
                            ))}
                            <SelectItem value="10+">10+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="childSeats"
                          className="flex items-center gap-2"
                        >
                          <BabyIcon className="h-4 w-4" />
                          {t("form.childSeat")}
                        </Label>
                        <Select
                          value={formState.childSeats}
                          onValueChange={handleChildSeatsChange}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("form.childSeatPlaceholder")}
                            />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <SelectItem value="0">0</SelectItem>
                            {[...Array(2)].map((_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Display Selected Vehicle - Moving this to be with Flight Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="flightNumber"
                          className="flex items-center gap-2"
                        >
                          <Plane className="h-4 w-4" />
                          Flight Number
                        </Label>
                        <Input
                          id="flightNumber"
                          name="flightNumber"
                          placeholder="e.g. FR1234"
                          value={formState.flightNumber}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="selectedVehicle"
                          className="flex items-center gap-2"
                        >
                          <Info className="h-4 w-4" />
                          Selected Vehicle
                        </Label>
                        <Select
                          value={selectedVehicle}
                          onValueChange={setSelectedVehicle}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a vehicle" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {vehicles.map((vehicle) => (
                              <SelectItem
                                key={vehicle.model}
                                value={vehicle.model}
                              >
                                {vehicle.model} ({vehicle.category})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="notes"
                        className="flex items-center gap-2"
                      >
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
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 min-w-[200px] relative"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="opacity-0">{t("form.submit")}</span>
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      </>
                    ) : (
                      t("form.submit")
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
