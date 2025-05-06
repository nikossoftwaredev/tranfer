"use client";

import { useState, useEffect } from "react";
import { InputWithIcon } from "../ui/input-with-icon";
import { PhoneInput } from "../ui/phone-input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/date-picker";
import { TimePicker } from "../ui/time-picker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslations, useLocale } from "next-intl";
import { useVehicle } from "../../contexts/VehicleContext";
import { LocationAutocomplete } from "../ui/LocationAutocomplete";
import { LocationOption } from "../ui/LocationAutocomplete";
import { useToast } from "../../hooks/use-toast";
import { sendMessage } from "../../lib/utils/sendMessage";
import { tours } from "../../lib/data/tours";
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
  Info
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  pickupLocation: LocationOption | undefined;
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
  const tf = useTranslations("Booking.form");
  const { selectedVehicle } = useVehicle();
  const { toast } = useToast();
  const locale = useLocale();

  // Find the tour if tourSlug is provided
  const selectedTour = tourSlug ? tours.find(tour => tour.slug === tourSlug) : undefined;

  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+30",
    pickupLocation: undefined,
    date: undefined,
    time: "",
    passengers: "1",
    luggage: "0",
    childSeats: "0",
    flightNumber: "",
    notes: "",
    selectedTour: selectedTour?.translations[locale]?.title || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: { phone: string; countryCode: string }) => {
    setFormState((prev) => ({
      ...prev,
      phone: value.phone,
      countryCode: value.countryCode,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormState((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleTimeChange = (time: string) => {
    setFormState((prev) => ({
      ...prev,
      time,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email with form data
      await sendMessage({
        ...formState,
        phone: `${formState.countryCode}${formState.phone}`,
        vehicle: selectedVehicle || "Not specified",
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
  };

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
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">{tf("title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tour Selection (if on tour page) */}
                {selectedTour && (
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {tf("title")}
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
                )}

                {/* Personal Information */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {tf("title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputWithIcon
                      id="fullName"
                      name="fullName"
                      label={tf("fullName")}
                      value={formState.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      icon={<User className="h-4 w-4" />}
                    />
                    <InputWithIcon
                      id="email"
                      name="email"
                      label={tf("email")}
                      value={formState.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      required
                      icon={<Mail className="h-4 w-4" />}
                    />
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {tf("phone")}
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
                      {tf("title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="pickupLocation" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {tf("pickupLabel")}
                        </Label>
                        <LocationAutocomplete
                          value={formState.pickupLocation}
                          onChange={(value) => {
                            setFormState((prev) => ({
                              ...prev,
                              pickupLocation: value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {tf("date")}
                        </Label>
                        <DatePicker
                          date={formState.date || new Date()}
                          setDate={handleDateChange}
                          placeholder={tf("date")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {tf("time")}
                        </Label>
                        <TimePicker
                          time={formState.time}
                          setTime={handleTimeChange}
                          placeholder={tf("time")}
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
                      {tf("title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="passengers" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {tf("passengers")}
                        </Label>
                        <Select
                          value={formState.passengers}
                          onValueChange={(value) =>
                            setFormState((prev) => ({
                              ...prev,
                              passengers: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={tf("selectPassengers")} />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} {tf("passengers")}
                              </SelectItem>
                            ))}
                            <SelectItem value="11+">11+ {tf("passengers")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="luggage" className="flex items-center gap-2">
                          <Luggage className="h-4 w-4" />
                          {tf("luggage")}
                        </Label>
                        <Select
                          value={formState.luggage}
                          onValueChange={(value) =>
                            setFormState((prev) => ({
                              ...prev,
                              luggage: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={tf("luggagePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i} {tf("luggagePlural")}
                              </SelectItem>
                            ))}
                            <SelectItem value="10+">10+ {tf("luggagePlural")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="childSeats" className="flex items-center gap-2">
                          <BabyIcon className="h-4 w-4" />
                          {tf("childSeat")}
                        </Label>
                        <Select
                          value={formState.childSeats}
                          onValueChange={(value) =>
                            setFormState((prev) => ({
                              ...prev,
                              childSeats: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={tf("childSeatPlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(3)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i} {tf("childSeatPlural")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="flightNumber" className="flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          {tf("notes")}
                        </Label>
                        <Input
                          id="flightNumber"
                          name="flightNumber"
                          placeholder={tf("notesPlaceholder")}
                          value={formState.flightNumber}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Requests */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {tf("title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="notes">{tf("notes")}</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formState.notes}
                        onChange={handleChange}
                        placeholder={tf("notesPlaceholder")}
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
                        <span className="opacity-0">{tf("submit")}</span>
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
                      tf("submit")
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
