"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { LocationOption } from "../components/ui/LocationAutocomplete";

// Define the shape of our booking form state
export type BookingFormState = {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  passport: string; // Optional passport information

  // Journey Details
  pickupLocation: LocationOption | undefined;
  dropoffLocation: LocationOption | undefined;
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

// Define the step of the booking wizard
export type WizardStep =
  | "personalInfo"
  | "journeyDetails"
  | "travelPreferences";

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
};

// Create the context
const BookingWizardContext = createContext<
  BookingWizardContextType | undefined
>(undefined);

// Define the initial state
const initialFormState: BookingFormState = {
  fullName: "",
  email: "",
  phone: "",
  countryCode: "+30",
  passport: "",
  pickupLocation: undefined,
  dropoffLocation: undefined,
  date: undefined,
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
const STEPS: WizardStep[] = [
  "personalInfo",
  "journeyDetails",
  "travelPreferences",
];

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

  const updateFormState = useCallback((updates: Partial<BookingFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setFormState({
      ...initialFormState,
      selectedTour: initialTour,
    });
    setCurrentStep("personalInfo");
  }, [initialTour]);

  const isStepComplete = useCallback(
    (step: WizardStep): boolean => {
      switch (step) {
        case "personalInfo":
          return !!formState.fullName && !!formState.email && !!formState.phone;
        case "journeyDetails":
          return (
            !!formState.pickupLocation &&
            !!formState.dropoffLocation &&
            !!formState.date
          );
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
    throw new Error(
      "useBookingWizard must be used within a BookingWizardProvider"
    );
  }
  return context;
};
