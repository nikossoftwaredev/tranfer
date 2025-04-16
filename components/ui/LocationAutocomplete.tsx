"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";

interface NominatimResult {
  place_id: number;
  osm_type?: string;
  osm_id?: number;
  display_name: string;
  name?: string;
  address: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    town?: string;
    municipality?: string;
    state?: string;
    country?: string;
    postcode?: string;
    [key: string]: string | undefined;
  };
  boundingbox?: string[];
}

export interface LocationOption {
  id: string;
  name: string;
  description?: string;
  uniqueKey: string;
}

const formatAddress = (address: NominatimResult["address"]) => {
  const parts = [];
  if (address.house_number) parts.push(address.house_number);
  if (address.road) parts.push(address.road);
  if (address.suburb) parts.push(address.suburb);
  if (address.city) parts.push(address.city);
  if (address.town) parts.push(address.town);
  if (address.state) parts.push(address.state);
  if (address.country) parts.push(address.country);
  return parts.join(", ");
};

interface Props {
  value?: LocationOption;
  onChange: (location: LocationOption) => void;
}

export const LocationAutocomplete = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setLocations([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&addressdetails=1&limit=10&accept-language=en`
      );

      const data: NominatimResult[] = await response.json();
      console.log("Search results:", data);

      if (data && Array.isArray(data)) {
        const formattedLocations: LocationOption[] = data.map((result) => {
          // Extract display name parts for a more user-friendly name
          const displayNameParts = result.display_name.split(", ");
          const simpleName =
            displayNameParts.length > 0
              ? displayNameParts[0]
              : result.display_name;

          return {
            id: result.place_id.toString(),
            name: result.name || simpleName,
            description: formatAddress(result.address),
            uniqueKey: `${result.place_id}_${result.display_name}`,
          };
        });

        setLocations(formattedLocations);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      searchLocations(debouncedQuery);
    } else {
      setLocations([]);
    }
  }, [debouncedQuery, searchLocations]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <div className="text-left truncate">
              <div className="font-medium">{value.name}</div>
              {value.description && (
                <div className="text-xs text-muted-foreground">
                  {value.description}
                </div>
              )}
            </div>
          ) : (
            "Search location..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search any location..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="py-6 text-center text-sm">Searching...</div>
              ) : query.length < 3 ? (
                <div className="py-6 text-center text-sm">
                  Type at least 3 characters to search...
                </div>
              ) : (
                <div className="py-6 text-center text-sm">
                  No locations found. Try a different search term.
                </div>
              )}
            </CommandEmpty>
            {locations.length > 0 && (
              <CommandGroup heading="Search Results">
                {locations.map((location) => (
                  <CommandItem
                    key={location.uniqueKey}
                    value={location.uniqueKey}
                    onSelect={() => {
                      onChange(location);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.id === location.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="w-full">
                      <div className="font-medium">{location.name}</div>
                      {location.description && (
                        <div className="text-sm text-muted-foreground">
                          {location.description}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
