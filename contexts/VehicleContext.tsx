"use client";

import React, { createContext, useContext, useState } from "react";

type VehicleContextType = {
  selectedVehicle: string;
  setSelectedVehicle: (vehicle: string) => void;
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  return (
    <VehicleContext.Provider value={{ selectedVehicle, setSelectedVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = (): VehicleContextType => {
  const context = useContext(VehicleContext);

  if (context === undefined) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }

  return context;
};
