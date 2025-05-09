"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plane, MapPin, ChevronsUpDown } from "lucide-react";
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
  lat?: string;
  lon?: string;
}

export interface LocationOption {
  id: string;
  name: string;
  description?: string;
  uniqueKey: string;
  isAirport?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
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

const isAirport = (result: NominatimResult): boolean => {
  const lowerDisplayName = result.display_name.toLowerCase();
  return (
    lowerDisplayName.includes("airport") ||
    lowerDisplayName.includes("aeroporto") ||
    lowerDisplayName.includes("aeropuerto") ||
    lowerDisplayName.includes("aeroport")
  );
};

interface Props {
  value?: LocationOption;
  onChange: (location: LocationOption) => void;
  isPickupLocation?: boolean;
}

export const LocationAutocomplete = ({
  value,
  onChange,
  isPickupLocation = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setLocations([]);
      return;
    }

    setIsLoading(true);

    try {
      // Use our own API endpoint instead of directly calling Nominatim
      const response = await fetch(
        `/api/location?q=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: NominatimResult[] = await response.json();

      if (data && Array.isArray(data)) {
        const formattedLocations: LocationOption[] = data.map((result) => {
          // Extract display name parts for a more user-friendly name
          const displayNameParts = result.display_name.split(", ");
          let name =
            result.name ||
            (displayNameParts.length > 0
              ? displayNameParts[0]
              : result.display_name);

          // Clean up hotel names
          if (name.toLowerCase().includes("hotel")) {
            name = name.replace(/hotel/i, "Hotel").trim();
          }

          const airportCheck = isAirport(result);

          // Extract coordinates if available
          const coordinates =
            result.lat && result.lon
              ? { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }
              : undefined;

          return {
            id: result.place_id.toString(),
            name,
            description: formatAddress(result.address),
            uniqueKey: `${result.place_id}_${result.display_name}`,
            isAirport: airportCheck,
            coordinates: coordinates,
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
          className="w-full justify-between h-auto min-h-[44px] py-2"
        >
          <div className="flex-1 text-left overflow-hidden truncate">
            {value ? (
              <div className="truncate">
                <div className="font-medium truncate">{value.name}</div>
                {value.description && (
                  <div className="text-xs text-muted-foreground truncate">
                    {value.description}
                  </div>
                )}
              </div>
            ) : (
              "Search location..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 max-w-none"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput
            placeholder={
              isPickupLocation
                ? "Enter airport, hotel, or place in Greece..."
                : "Enter destination in Greece..."
            }
            value={query}
            onValueChange={setQuery}
            className="h-10"
          />
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty>
              {isLoading ? (
                <div className="py-6 text-center text-sm">Searching...</div>
              ) : query.length < 2 ? (
                <div className="py-6 text-center text-sm">
                  Type at least 2 characters to search...
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-wrap">
                  No locations found. Try different spelling or more general
                  terms.
                </div>
              )}
            </CommandEmpty>
            {locations.length > 0 && (
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={location.uniqueKey}
                    value={location.uniqueKey}
                    onSelect={() => {
                      onChange(location);
                      setOpen(false);
                    }}
                    className="cursor-pointer py-3"
                  >
                    <div className="flex items-start w-full overflow-hidden">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        {location.isAirport ? (
                          <Plane className="h-4 w-4 text-primary" />
                        ) : (
                          <MapPin className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium text-sm truncate">
                          {location.name}
                        </div>
                        {location.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {location.description}
                          </div>
                        )}
                      </div>
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
