"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
}

export const LocationAutocomplete = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("Athens Airport");
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
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&addressdetails=1&limit=10&accept-language=en`
      );

      const data: NominatimResult[] = await response.json();
      // Remove debug logging that might cause performance issues
      // console.log("Search results:", data);

      if (data && Array.isArray(data)) {
        const formattedLocations: LocationOption[] = data.map((result) => {
          // Extract display name parts for a more user-friendly name
          const displayNameParts = result.display_name.split(", ");
          const simpleName =
            displayNameParts.length > 0
              ? displayNameParts[0]
              : result.display_name;
          const airportCheck = isAirport(result);

          // Extract coordinates if available
          const coordinates =
            result.lat && result.lon
              ? { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }
              : undefined;

          return {
            id: result.place_id.toString(),
            name: result.name || simpleName,
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

  // Memoize CommandItems to avoid recreating components on each render
  const locationItems = useMemo(() => {
    return locations.map((location) => (
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
            <div className="font-medium text-sm truncate">{location.name}</div>
            {location.description && (
              <div className="text-xs text-muted-foreground truncate">
                {location.description}
              </div>
            )}
          </div>
        </div>
      </CommandItem>
    ));
  }, [locations, onChange]);

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
            placeholder="Search any location..."
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
                  No locations found. Try a different search term.
                </div>
              )}
            </CommandEmpty>
            {locations.length > 0 && (
              <CommandGroup>{locationItems}</CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
