"use client";

import * as React from "react";
import { Calendar } from "./calendar";
import { Label } from "./label";
import { cn } from "../../lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

export const DatePicker = ({
  date,
  setDate,
  className,
  label,
  placeholder = "Pick a date",
}: DatePickerProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Format date as YYYY-MM-DD for the input value
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Calendar
        value={formatDateForInput(date)}
        onDateChange={setDate}
        ref={inputRef}
        placeholder={placeholder}
      />
    </div>
  );
};
