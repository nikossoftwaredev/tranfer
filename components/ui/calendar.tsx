"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface CalendarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onDateChange?: (date: Date | undefined) => void;
}

const Calendar = React.forwardRef<HTMLInputElement, CalendarProps>(
  ({ className, onDateChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onDateChange) {
        if (e.target.value) {
          onDateChange(new Date(e.target.value));
        } else {
          onDateChange(undefined);
        }
      }
    };

    return (
      <input
        type="date"
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };
