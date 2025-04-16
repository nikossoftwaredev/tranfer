"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Input } from "./input";
import { cn } from "../../lib/utils";

interface TimePickerProps {
  time: string;
  setTime: (time: string) => void;
  className?: string;
  placeholder?: string;
}

export const TimePicker = ({
  time,
  setTime,
  className,
  placeholder = "Select time",
}: TimePickerProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center z-10">
        <Clock className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className={cn("pl-9 h-10 cursor-pointer", className)}
        placeholder={placeholder}
      />
    </div>
  );
};
