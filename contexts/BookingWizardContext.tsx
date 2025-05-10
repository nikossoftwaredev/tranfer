"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { PlacePrediction } from "../server_actions/googleSearchActions";
import { z } from "zod";

// Define the shape of our booking form state
export type BookingFormState = {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  passport: string; // Optional passport information

  // Journey Details
  pickupLocation: (PlacePrediction & { coordinates?: { lat: number; lng: number } }) | undefined;
  dropoffLocation: (PlacePrediction & { coordinates?: { lat: number; lng: number } }) | undefined;
  date: Date | undefined;
  time: string;

  // Travel Preferences
  passengers: string;
  luggage: string;
  childSeats: string;
  flightNumber: string;
  selectedVehicle: string;
  notes: string;

  // If on tour page
  selectedTour: string;
};

// ValidationErrors type to track errors for each field
export type ValidationErrors = {
  [key in keyof BookingFormState]?: string;
};

// Define the step of the booking wizard
export type WizardStep = "personalInfo" | "journeyDetails" | "travelPreferences";

// Define the shape of our context
type BookingWizardContextType = {
  formState: BookingFormState;
  updateFormState: (updates: Partial<BookingFormState>) => void;
  currentStep: WizardStep;
  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  resetForm: () => void;
  isStepComplete: (step: WizardStep) => boolean;
  validationErrors: ValidationErrors;
  clearValidationErrors: () => void;
};

// Create Zod schemas for each step
const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address (e.g., name@example.com)"),
  phone: z.string().refine((val) => val.replace(/[^0-9]/g, "").length >= 10, {
    message: "Please enter a valid phone number with at least 10 digits",
  }),
  countryCode: z.string(),
  passport: z.string().optional(),
});

const journeyDetailsSchema = z.object({
  pickupLocation: z
    .object({})
    .nullable()
    .refine((val) => val !== null && val !== undefined, {
      message: "Please select a pickup location from the dropdown",
    }),
  dropoffLocation: z
    .object({})
    .nullable()
    .refine((val) => val !== null && val !== undefined, {
      message: "Please select a dropoff location from the dropdown",
    }),
  date: z.date({
    required_error: "Please select a travel date",
    invalid_type_error: "Please select a valid date for your journey",
  }),
  time: z.string(),
});

// Create the context
const BookingWizardContext = createContext<BookingWizardContextType | undefined>(undefined);

// Define the initial state
const initialFormState: BookingFormState = {
  fullName: "",
  email: "",
  phone: "",
  countryCode: "+30",
  passport: "",
  pickupLocation: undefined,
  dropoffLocation: undefined,
  date: new Date(),
  time: "12:00",
  passengers: "1",
  luggage: "0",
  childSeats: "0",
  flightNumber: "",
  selectedVehicle: "",
  notes: "",
  selectedTour: "",
};

// Steps order for navigation
const STEPS: WizardStep[] = ["personalInfo", "journeyDetails", "travelPreferences"];

// Provider component
export const BookingWizardProvider: React.FC<{
  children: React.ReactNode;
  initialTour?: string;
}> = ({ children, initialTour = "" }) => {
  const [formState, setFormState] = useState<BookingFormState>({
    ...initialFormState,
    selectedTour: initialTour,
  });
  const [currentStep, setCurrentStep] = useState<WizardStep>("personalInfo");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const updateFormState = useCallback((updates: Partial<BookingFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    let isValid = true;
    const errors: ValidationErrors = {};
    const isTourBooking = !!formState.selectedTour;

    try {
      switch (currentStep) {
        case "personalInfo":
          // Extract only the fields for this step
          const personalInfo = {
            fullName: formState.fullName,
            email: formState.email,
            phone: formState.phone,
            countryCode: formState.countryCode,
            passport: formState.passport,
          };

          personalInfoSchema.parse(personalInfo);
          break;

        case "journeyDetails":
          // For tours, we don't need a dropoff location (it's defined by the tour)
          if (isTourBooking) {
            // Only validate pickup location and date/time for tours
            const tourJourneyDetails = {
              pickupLocation: formState.pickupLocation,
              date: formState.date,
              time: formState.time,
            };

            z.object({
              pickupLocation: z
                .object({})
                .nullable()
                .refine((val) => val !== null && val !== undefined, {
                  message: "Please select a pickup location from the dropdown",
                }),
              date: z.date({
                required_error: "Please select a travel date",
                invalid_type_error: "Please select a valid date for your journey",
              }),
              time: z.string(),
            }).parse(tourJourneyDetails);
          } else {
            const journeyDetails = {
              pickupLocation: formState.pickupLocation,
              dropoffLocation: formState.dropoffLocation,
              date: formState.date,
              time: formState.time,
            };

            journeyDetailsSchema.parse(journeyDetails);
          }
          break;

        case "travelPreferences":
          // No required fields in this step
          break;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        isValid = false;
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          errors[path as keyof BookingFormState] = err.message;
        });
        setValidationErrors(errors);
      }
    }

    return isValid;
  }, [currentStep, formState]);

  const nextStep = useCallback(() => {
    // Validate current step before proceeding
    const isValid = validateCurrentStep();

    if (isValid) {
      const currentIndex = STEPS.indexOf(currentStep);
      if (currentIndex < STEPS.length - 1) {
        setCurrentStep(STEPS[currentIndex + 1]);
        // Clear validation errors when moving to the next step
        setValidationErrors({});
      }
    }
  }, [currentStep, validateCurrentStep]);

  const prevStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
      // Clear validation errors when moving back
      setValidationErrors({});
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setFormState({
      ...initialFormState,
      selectedTour: initialTour,
    });
    setCurrentStep("personalInfo");
    setValidationErrors({});
  }, [initialTour]);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  const isStepComplete = useCallback(
    (step: WizardStep): boolean => {
      const isTourBooking = !!formState.selectedTour;

      // This now just performs a simple check without validation
      // The actual validation happens in validateCurrentStep when trying to move to next step
      switch (step) {
        case "personalInfo":
          return !!formState.fullName && !!formState.email && !!formState.phone;
        case "journeyDetails":
          if (isTourBooking) {
            // For tours, we only need pickup location and date
            return !!formState.pickupLocation && !!formState.date;
          } else {
            // For regular transfers, we need both pickup and dropoff
            return !!formState.pickupLocation && !!formState.dropoffLocation && !!formState.date;
          }
        case "travelPreferences":
          return true; // Optional fields, so always complete
        default:
          return false;
      }
    },
    [formState]
  );

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isLastStep = currentStepIndex === STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    <BookingWizardContext.Provider
      value={{
        formState,
        updateFormState,
        currentStep,
        setStep,
        nextStep,
        prevStep,
        isLastStep,
        isFirstStep,
        resetForm,
        isStepComplete,
        validationErrors,
        clearValidationErrors,
      }}
    >
      {children}
    </BookingWizardContext.Provider>
  );
};

// Custom hook to use the booking wizard context
export const useBookingWizard = () => {
  const context = useContext(BookingWizardContext);
  if (context === undefined) {
    throw new Error("useBookingWizard must be used within a BookingWizardProvider");
  }
  return context;
};
