"use client";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { FaClock } from "react-icons/fa";
import * as React from "react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
}

// Move static arrays outside the component
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

const TimePickerComponent = ({ value, onChange }: TimePickerProps) => {
  const [open, setOpen] = React.useState(false);

  // Parse hours and minutes from value
  const [hoursStr, minutesStr] =
    value.split(":").length === 2 ? value.split(":") : ["00", "00"];

  // Convert to integers for selection
  const hoursValue = parseInt(hoursStr);
  const minutesValue = parseInt(minutesStr);

  const handleHoursSelect = useCallback(
    (hour: number) => {
      const formattedHours = hour.toString().padStart(2, "0");
      const formattedMinutes = minutesValue.toString().padStart(2, "0");
      onChange(`${formattedHours}:${formattedMinutes}`);
    },
    [minutesValue, onChange]
  );

  const handleMinutesSelect = useCallback(
    (minute: number) => {
      const formattedHours = hoursValue.toString().padStart(2, "0");
      const formattedMinutes = minute.toString().padStart(2, "0");
      onChange(`${formattedHours}:${formattedMinutes}`);
    },
    [hoursValue, onChange]
  );

  const handleTriggerClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={handleTriggerClick}
          >
            <div className="flex items-center">
              <FaClock className="mr-2 h-4 w-4 opacity-70" />
              <span>{value}</span>
            </div>
            <span className="sr-only">Open time picker</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          sideOffset={4}
          style={{ zIndex: 9999 }}
          forceMount
        >
          <div className="flex h-[300px] divide-x border-t">
            {/* Hours Column */}
            <ScrollArea className="w-auto">
              <div className="flex flex-col p-2">
                {HOURS.map((hour) => (
                  <Button
                    type="button"
                    key={hour}
                    variant={hoursValue === hour ? "default" : "ghost"}
                    className={cn(
                      "rounded-none h-10",
                      hoursValue === hour &&
                        "bg-primary text-primary-foreground"
                    )}
                    onClick={() => handleHoursSelect(hour)}
                  >
                    {hour.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-auto">
              <div className="flex flex-col p-2">
                {MINUTES.map((minute) => (
                  <Button
                    type="button"
                    key={minute}
                    variant={minutesValue === minute ? "default" : "ghost"}
                    className={cn(
                      "rounded-none h-10",
                      minutesValue === minute &&
                        "bg-primary text-primary-foreground"
                    )}
                    onClick={() => handleMinutesSelect(minute)}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

TimePickerComponent.displayName = "TimePicker";

// No need to memoize the whole component
export const TimePicker = TimePickerComponent;
