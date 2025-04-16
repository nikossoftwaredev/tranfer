"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/date-picker";
import { TimePicker } from "../ui/time-picker";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { useTranslations } from "next-intl";
import { useVehicle } from "../../contexts/VehicleContext";
import { LocationAutocomplete } from "../ui/LocationAutocomplete";
import { LocationOption } from "../ui/LocationAutocomplete";
import { useToast } from "../../hooks/use-toast";
import { sendMessage } from "../../lib/utils/sendMessage";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: LocationOption;
  dropoffLocation: LocationOption;
  date: Date | undefined;
  time: string;
  passengers: string;
  vehicle: string;
  notes: string;
};

const BookingSection = () => {
  const t = useTranslations("Booking");
  const { selectedVehicle, setSelectedVehicle } = useVehicle();
  const { toast } = useToast();

  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: {
      id: "",
      name: "",
      description: "",
      uniqueKey: "",
    },
    dropoffLocation: {
      id: "",
      name: "",
      description: "",
      uniqueKey: "",
    },
    date: undefined,
    time: "",
    passengers: "",
    vehicle: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      vehicle: selectedVehicle,
    }));
  }, [selectedVehicle]);

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

  const handleSelectChange = (
    name: keyof Pick<FormState, "passengers" | "vehicle">,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "vehicle") {
      setSelectedVehicle(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send email with form data
    sendMessage(formState)
      .then((result) => {
        setIsSubmitting(false);

        if (result.success) {
          // Show success toast if the email was sent successfully
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
            pickupLocation: {
              id: "",
              name: "",
              description: "",
              uniqueKey: "",
            },
            dropoffLocation: {
              id: "",
              name: "",
              description: "",
              uniqueKey: "",
            },
            notes: "",
          }));
        } else {
          // Show error toast if there was an issue sending the email
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "There was a problem submitting your request. Please try again later or contact us directly.",
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        // Show error toast if there was an exception
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "There was a problem submitting your request. Please try again later or contact us directly.",
        });
        console.error("Form submission error:", error);
      });
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

        <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-md border border-border p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {t("form.title")}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("form.fullName")}</Label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formState.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("form.email")}</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("form.phone")}</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t("form.trip")}</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">
                      {t("form.pickupLabel")}
                    </Label>
                    <LocationAutocomplete
                      value={formState.pickupLocation}
                      onChange={(value) => {
                        setFormState((prev) => ({
                          ...prev,
                          pickupLocation: value,
                        }));
                      }}
                      isPickup={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoffLocation">{t("form.dropoff")}</Label>
                    <LocationAutocomplete
                      value={formState.dropoffLocation}
                      onChange={(value) => {
                        setFormState((prev) => ({
                          ...prev,
                          dropoffLocation: value,
                        }));
                      }}
                      isPickup={false}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">{t("form.date")}</Label>
                      <DatePicker
                        date={formState.date || new Date()}
                        setDate={handleDateChange}
                        placeholder={t("form.date")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">{t("form.time")}</Label>
                      <TimePicker
                        time={formState.time}
                        setTime={handleTimeChange}
                        placeholder={t("form.time")}
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {t("form.additional")}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="passengers">{t("form.passengers")}</Label>
                    <Select
                      value={formState.passengers}
                      onValueChange={(value: string) =>
                        handleSelectChange("passengers", value)
                      }
                    >
                      <option value="1">
                        1 {t("form.selectPassengers").split(" ")[0]}
                      </option>
                      <option value="2">
                        2 {t("form.selectPassengers").split(" ")[1]}
                      </option>
                      <option value="3">
                        3 {t("form.selectPassengers").split(" ")[1]}
                      </option>
                      <option value="4">
                        4 {t("form.selectPassengers").split(" ")[1]}
                      </option>
                      <option value="5">
                        5 {t("form.selectPassengers").split(" ")[1]}
                      </option>
                      <option value="6">
                        6 {t("form.selectPassengers").split(" ")[1]}
                      </option>
                      <option value="7+">
                        7+ {t("form.selectPassengers").split(" ")[1]}
                      </option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle">{t("form.vehicle")}</Label>
                    <Select
                      value={formState.vehicle}
                      onValueChange={(value: string) =>
                        handleSelectChange("vehicle", value)
                      }
                    >
                      <option value="">{t("form.selectVehicle")}</option>
                      <option value="Mercedes S-Class">Mercedes S-Class</option>
                      <option value="Mercedes Vito">
                        Mercedes Vito (up to 7 passengers)
                      </option>
                      <option value="Tesla Model S">Tesla Model S</option>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {t("form.special")}
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="notes">{t("form.notes")}</Label>
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
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
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
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
