"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { sendTelegramBookingMessage } from "../../server_actions/telegram";
import { BookingWizardProvider, useBookingWizard } from "../../contexts/BookingWizardContext";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import JourneyDetailsStep from "./steps/JourneyDetailsStep";
import TravelPreferencesStep from "./steps/TravelPreferencesStep";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { tours } from "../../lib/data/tours";

type BookingWizardProps = {
  tourSlug?: string;
};

// The main wizard component that uses the context provider
const BookingWizard = ({ tourSlug }: BookingWizardProps) => {
  const locale = useLocale();

  // Get the selected tour if tourSlug is provided
  const selectedTour = useMemo(() => (tourSlug ? tours.find((tour) => tour.slug === tourSlug) : undefined), [tourSlug]);

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
  const { formState, currentStep, nextStep, prevStep, isLastStep, isFirstStep, isStepComplete } = useBookingWizard();

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
      await sendTelegramBookingMessage({
        ...formState,
        phone: formState.phone,
        vehicle: formState.selectedVehicle || "Not specified",
        pickupLocation: {
          ...formState.pickupLocation,
          label: formState.pickupLocation?.structured_formatting.main_text || "Not specified",
          value: formState.pickupLocation?.place_id || "Not specified",
          description: formState.pickupLocation?.description || "Not specified",
          coordinates: pickupCoordinates,
        },
        dropoffLocation: {
          ...formState.dropoffLocation,
          label: formState.dropoffLocation?.structured_formatting.main_text || "Not specified",
          value: formState.dropoffLocation?.place_id || "Not specified",
          description: formState.dropoffLocation?.description || "Not specified",
          coordinates: dropoffCoordinates,
        },
        isoDateTime: isoDateTime,
        bookingType: formState.selectedTour ? "Tour Booking" : "Transfer",
      });

      toast.success(t("success.title"), {
        description: t("success.message"),
      });
    } catch (error) {
      toast.error("Error", {
        description: "There was a problem submitting your request. Please try again later or contact us directly.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, t]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-background/80 backdrop-blur-sm border-2 min-h-[400px]">
          <CardContent className="p-6">
            {/* Back button for non-first steps */}
            {!isFirstStep && (
              <button
                onClick={prevStep}
                className="text-muted-foreground hover:text-primary transition-colors mb-6"
                disabled={isSubmitting}
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Step content with step title at the top */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                {currentStep === "personalInfo" && <>{t("wizard.personalInfoTitle")}</>}
                {currentStep === "journeyDetails" && <>{t("wizard.journeyDetailsTitle")}</>}
                {currentStep === "travelPreferences" && <>{t("wizard.travelPreferencesTitle")}</>}
              </h3>

              <div className="space-y-6">
                {currentStep === "personalInfo" && <PersonalInfoStep />}
                {currentStep === "journeyDetails" && <JourneyDetailsStep />}
                {currentStep === "travelPreferences" && <TravelPreferencesStep />}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4">
              {isLastStep ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isStepComplete(currentStep)}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {t("form.submitting")}
                    </>
                  ) : (
                    "Book Now"
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={nextStep}
                  disabled={!isStepComplete(currentStep)}
                  className="w-full"
                >
                  Continue
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingWizard;
