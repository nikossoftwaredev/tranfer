"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { sendTelegramBookingMessage } from "../../server_actions/telegram";
import { sendBookingConfirmationEmail } from "../../server_actions/emailActions";
import { BookingWizardProvider, useBookingWizard } from "../../contexts/BookingWizardContext";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import JourneyDetailsStep from "./steps/JourneyDetailsStep";
import TravelPreferencesStep from "./steps/TravelPreferencesStep";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
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

// Success screen component
const SuccessScreen = ({ email }: { email?: string }) => {
  const t = useTranslations("Booking");

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <CheckCircle className="h-32 w-32 text-green-500 mb-6" />
      <h3 className="text-2xl font-bold mb-2">{t("success.title")}</h3>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">{t("success.message")}</p>
      <p className="text-sm text-muted-foreground">
        {email ? "We've sent a confirmation email to your inbox." : "Thank you for booking with us!"}
      </p>
    </div>
  );
};

// The content component that uses the context
const BookingWizardContent = () => {
  const t = useTranslations("Booking");
  const { formState, currentStep, nextStep, prevStep, isLastStep, isFirstStep, isStepComplete, resetForm } =
    useBookingWizard();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // Handle the form submission
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    try {
      // Send form data to Telegram
      await sendTelegramBookingMessage(formState);

      // Send confirmation email to customer
      if (formState.email) {
        await sendBookingConfirmationEmail(formState);
      }

      // Show success notification
      toast.success(t("success.title"), {
        description: t("success.message"),
      });

      // Set booking as complete to show success screen
      setIsBookingComplete(true);
    } catch (error) {
      toast.error("Error", {
        description: "There was a problem submitting your request. Please try again later or contact us directly.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, t]);

  const handleNewBooking = useCallback(() => {
    // Reset form and booking state
    resetForm();
    setIsBookingComplete(false);
  }, [resetForm]);

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
            {isBookingComplete ? (
              <>
                <SuccessScreen email={formState.email} />
                <div className="flex justify-center mt-6">
                  <Button onClick={handleNewBooking} variant="outline">
                    Make Another Booking
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Step content with step title at the top */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    {!isFirstStep && (
                      <button
                        onClick={prevStep}
                        className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                        disabled={isSubmitting}
                        aria-label="Go back"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                    )}
                    <h3 className="text-xl font-semibold">
                      {currentStep === "personalInfo" && <>{t("wizard.personalInfoTitle")}</>}
                      {currentStep === "journeyDetails" && <>{t("wizard.journeyDetailsTitle")}</>}
                      {currentStep === "travelPreferences" && <>{t("wizard.travelPreferencesTitle")}</>}
                    </h3>
                  </div>

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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingWizard;
