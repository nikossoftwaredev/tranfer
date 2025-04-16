"use client";

import React, { useState } from "react";
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
  display_name: string;
  name: string;
  address: {
    amenity?: string;
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

interface LocationOption {
  id: string;
  name: string;
  description?: string;
  uniqueKey: string;
}

const ATH_AIRPORT: LocationOption = {
  id: "ATH",
  name: "Athens International Airport (ATH)",
  description: "Attiki Odos, Spata Artemida 190 04",
  uniqueKey: "ATH_AIRPORT_SPATA",
};

const formatAddress = (address: NominatimResult["address"]) => {
  const parts = [];
  if (address.road) parts.push(address.road);
  if (address.suburb) parts.push(address.suburb);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.country) parts.push(address.country);
  if (address.postcode) parts.push(address.postcode);
  return parts.join(", ");
};

interface Props {
  value?: LocationOption;
  onChange: (location: LocationOption) => void;
  isPickup?: boolean;
}

export const LocationAutocomplete = ({ value, onChange, isPickup }: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const selectedLocation = value;

  const searchLocations = React.useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < 3) {
        setLocations([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            searchQuery
          )}&format=json&addressdetails=1&limit=5`
        );
        const data: NominatimResult[] = await response.json();

        const formattedLocations: LocationOption[] = data.map((result) => ({
          id: result.place_id.toString(),
          name: result.name || result.display_name.split(",")[0],
          description: formatAddress(result.address),
          uniqueKey: `${result.place_id}_${result.display_name}`,
        }));

        // Only add ATH to pickup locations and when query matches
        if (isPickup && searchQuery.toLowerCase().includes("ath")) {
          formattedLocations.unshift(ATH_AIRPORT);
        }

        setLocations(formattedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]);
      }
    },
    [isPickup]
  );

  React.useEffect(() => {
    if (debouncedQuery) {
      searchLocations(debouncedQuery);
    } else {
      setLocations([]);
    }
  }, [debouncedQuery, searchLocations]);

  // Only set ATH as initial value if it's a pickup location and no value is provided
  React.useEffect(() => {
    if (isPickup && !value && !query) {
      setQuery("ATH");
    }
  }, [isPickup, value, query]);

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
            <div className="text-left">
              <div className="font-medium">{value.name}</div>
              {value.description && (
                <div className="text-sm text-muted-foreground">
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
            placeholder="Search location..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {query.length < 3 ? (
                <div className="py-6 text-center text-sm">
                  Type at least 3 characters to search...
                </div>
              ) : (
                <div className="py-6 text-center text-sm">
                  No location found.
                </div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.uniqueKey}
                  value={location.id}
                  onSelect={() => {
                    onChange(location);
                    setOpen(false);
                  }}
                  className="cursor-pointer data-[selected=true]:bg-accent"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation?.id === location.id
                        ? "opacity-100"
                        : "opacity-0"
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
