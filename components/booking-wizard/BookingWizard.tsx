"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { sendTelegramMessage } from "../../server_actions/telegram";
import {
  BookingWizardProvider,
  useBookingWizard,
} from "../../contexts/BookingWizardContext";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import JourneyDetailsStep from "./steps/JourneyDetailsStep";
import TravelPreferencesStep from "./steps/TravelPreferencesStep";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { tours } from "../../lib/data/tours";

type BookingWizardProps = {
  tourSlug?: string;
};

// The main wizard component that uses the context provider
const BookingWizard = ({ tourSlug }: BookingWizardProps) => {
  const locale = useLocale();

  // Get the selected tour if tourSlug is provided
  const selectedTour = useMemo(
    () => (tourSlug ? tours.find((tour) => tour.slug === tourSlug) : undefined),
    [tourSlug]
  );

  const initialTour = selectedTour?.translations[locale]?.title || "";

  return (
    <BookingWizardProvider initialTour={initialTour}>
      <BookingWizardContent />
    </BookingWizardProvider>
  );
};

// The content component that uses the context
const BookingWizardContent = () => {
  const t = useTranslations("Booking");
  const { toast } = useToast();
  const {
    formState,
    currentStep,
    nextStep,
    prevStep,
    isLastStep,
    isFirstStep,
    isStepComplete,
  } = useBookingWizard();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the form submission
  const handleSubmit = useCallback(async () => {
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
        vehicle: formState.selectedVehicle || "Not specified",
        pickupLocation: {
          ...formState.pickupLocation,
          label: formState.pickupLocation?.name || "Not specified",
          value: formState.pickupLocation?.uniqueKey || "Not specified",
          description: formState.pickupLocation?.description || "Not specified",
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
        bookingType: formState.selectedTour ? "Tour Booking" : "Transfer",
      });

      toast({
        variant: "default",
        title: t("success.title"),
        description: t("success.message"),
      });
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
  }, [formState, t, toast]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Stepper */}
      <div className="flex justify-center mb-8">
        <StepIndicator />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-background/80 backdrop-blur-sm border-2 min-h-[400px]">
          <CardContent className="p-6">
            {/* Steps */}
            <div className="mb-8">
              {currentStep === "personalInfo" && <PersonalInfoStep />}
              {currentStep === "journeyDetails" && <JourneyDetailsStep />}
              {currentStep === "travelPreferences" && <TravelPreferencesStep />}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={isFirstStep || isSubmitting}
                className={cn("gap-2", isFirstStep && "invisible")}
              >
                <ArrowLeft className="h-4 w-4" />
                {t("form.back")}
              </Button>

              <div>
                {isLastStep ? (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isStepComplete(currentStep)}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("form.submitting")}
                      </>
                    ) : (
                      <>
                        {t("form.submit")}
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepComplete(currentStep)}
                    className="gap-2"
                  >
                    {t("form.next")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Stepper component
const StepIndicator = () => {
  const { currentStep } = useBookingWizard();
  const t = useTranslations("Booking.wizard");

  const steps = [
    { id: "personalInfo", label: t("personalInfo") },
    { id: "journeyDetails", label: t("journeyDetails") },
    { id: "travelPreferences", label: t("travelPreferences") },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium",
              currentStep === step.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-muted-foreground/30"
            )}
          >
            {index + 1}
          </div>

          <div className="ml-2">
            <div className="text-sm font-medium">{step.label}</div>
          </div>

          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 bg-muted-foreground/30 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingWizard;
