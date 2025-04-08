"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/date-picker";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { useTranslations } from "next-intl";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: Date | undefined;
  time: string;
  passengers: string;
  vehicle: string;
  notes: string;
};

const BookingSection = () => {
  const t = useTranslations("Booking");
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    date: undefined,
    time: "",
    passengers: "",
    vehicle: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleSelectChange = (
    name: keyof Pick<FormState, "passengers" | "vehicle">,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({
        fullName: "",
        email: "",
        phone: "",
        pickupLocation: "",
        dropoffLocation: "",
        date: undefined,
        time: "",
        passengers: "",
        vehicle: "",
        notes: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
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
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("success.title")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("success.message")}
              </p>
              <Button
                onClick={() => setSubmitSuccess(false)}
                variant="link"
                className="text-primary font-medium"
              >
                {t("success.button")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {t("form.personal")}
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
                  <h3 className="text-lg font-semibold mb-4">
                    {t("form.trip")}
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">{t("form.pickup")}</Label>
                      <Input
                        type="text"
                        id="pickupLocation"
                        name="pickupLocation"
                        value={formState.pickupLocation}
                        onChange={handleChange}
                        placeholder={t("form.pickupPlaceholder")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropoffLocation">
                        {t("form.dropoff")}
                      </Label>
                      <Input
                        type="text"
                        id="dropoffLocation"
                        name="dropoffLocation"
                        value={formState.dropoffLocation}
                        onChange={handleChange}
                        placeholder={t("form.dropoffPlaceholder")}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">{t("form.date")}</Label>
                        <DatePicker
                          date={formState.date}
                          setDate={handleDateChange}
                          placeholder={t("form.date")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">{t("form.time")}</Label>
                        <Input
                          type="time"
                          id="time"
                          name="time"
                          value={formState.time}
                          onChange={handleChange}
                          required
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
                        options={[
                          {
                            value: "1",
                            label:
                              "1 " + t("form.selectPassengers").split(" ")[0],
                          },
                          {
                            value: "2",
                            label:
                              "2 " + t("form.selectPassengers").split(" ")[1],
                          },
                          {
                            value: "3",
                            label:
                              "3 " + t("form.selectPassengers").split(" ")[1],
                          },
                          {
                            value: "4",
                            label:
                              "4 " + t("form.selectPassengers").split(" ")[1],
                          },
                          {
                            value: "5",
                            label:
                              "5 " + t("form.selectPassengers").split(" ")[1],
                          },
                          {
                            value: "6",
                            label:
                              "6 " + t("form.selectPassengers").split(" ")[1],
                          },
                          {
                            value: "7+",
                            label:
                              "7+ " + t("form.selectPassengers").split(" ")[1],
                          },
                        ]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle">{t("form.vehicle")}</Label>
                      <Select
                        value={formState.vehicle}
                        onValueChange={(value: string) =>
                          handleSelectChange("vehicle", value)
                        }
                        options={[
                          { value: "", label: t("form.selectVehicle") },
                          {
                            value: "Mercedes S-Class",
                            label: "Mercedes S-Class",
                          },
                          {
                            value: "Mercedes Vito",
                            label: "Mercedes Vito (up to 7 passengers)",
                          },
                          { value: "Tesla Model S", label: "Tesla Model S" },
                        ]}
                      />
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
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
