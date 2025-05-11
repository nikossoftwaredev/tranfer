"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value = 0,
      min = 0,
      max = Infinity,
      step = 1,
      onChange,
      className,
      inputClassName,
      buttonClassName,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<number>(value);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleIncrement = () => {
      const newValue = Math.min(inputValue + step, max);
      setInputValue(newValue);
      onChange?.(newValue);
    };

    const handleDecrement = () => {
      const newValue = Math.max(inputValue - step, min);
      setInputValue(newValue);
      onChange?.(newValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value.replace(/[^\d]/g, "") || "0");
      const boundedValue = Math.min(Math.max(val, min), max);
      setInputValue(boundedValue);
      onChange?.(boundedValue);
    };

    const handleBlur = () => {
      // Make sure the value is clamped between min and max
      const boundedValue = Math.min(Math.max(inputValue, min), max);
      if (boundedValue !== inputValue) {
        setInputValue(boundedValue);
        onChange?.(boundedValue);
      }
    };

    return (
      <div className={cn("flex items-center", className)}>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn("h-9 w-9 rounded-r-none", buttonClassName)}
          onClick={handleDecrement}
          disabled={inputValue <= min}
          tabIndex={-1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn("rounded-none text-center w-16", inputClassName)}
          {...props}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn("h-9 w-9 rounded-l-none", buttonClassName)}
          onClick={handleIncrement}
          disabled={inputValue >= max}
          tabIndex={-1}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
