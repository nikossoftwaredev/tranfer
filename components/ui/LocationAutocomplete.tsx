"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import debounce from "lodash.debounce";

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    house_number?: string;
    postcode?: string;
    suburb?: string;
    city?: string;
    state?: string;
    amenity?: string;
    aeroway?: string;
  };
  type?: string;
  class?: string;
}

interface LocationOption {
  id: string;
  name: string;
  description?: string;
  lat: string;
  lon: string;
  uniqueKey: string;
  isAirport?: boolean;
}

const formatAddress = (
  result: NominatimResult
): {
  name: string;
  description: string;
  uniqueKey: string;
  isAirport: boolean;
} => {
  const addr = result.address || {};
  const isAirport =
    result.class === "aeroway" ||
    result.type === "aerodrome" ||
    addr.aeroway === "aerodrome" ||
    result.display_name.toLowerCase().includes("airport");

  // Special handling for Athens International Airport
  if (isAirport && result.display_name.toLowerCase().includes("athens")) {
    return {
      name: "Athens International Airport (ATH)",
      description: "Eleftherios Venizelos International Airport",
      uniqueKey: `ath-airport-${result.place_id}`,
      isAirport: true,
    };
  }

  const street = addr.road || "";
  const number = addr.house_number || "";
  const postcode = addr.postcode || "";
  const suburb = addr.suburb || "";
  const city = addr.city || "";
  const amenity = addr.amenity || "";

  let mainPart = "";
  let secondaryPart = "";

  if (isAirport) {
    mainPart = result.display_name.split(",")[0];
    secondaryPart = result.display_name.split(",").slice(1, 3).join(",").trim();
  } else {
    mainPart =
      [street, number].filter(Boolean).join(" ") ||
      amenity ||
      result.display_name.split(",")[0];
    secondaryPart = [suburb, city, postcode].filter(Boolean).join(", ");
  }

  // Make uniqueKey more specific by including coordinates
  const uniqueKey = `${result.lat},${result.lon}`;

  return {
    name: mainPart,
    description: secondaryPart,
    uniqueKey,
    isAirport,
  };
};

interface LocationAutocompleteProps {
  value?: string;
  onChange: (value: LocationOption) => void;
  placeholder?: string;
  isPickup?: boolean;
}

export const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter Location...",
  isPickup = false,
}: LocationAutocompleteProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [locations, setLocations] = React.useState<LocationOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedLocation = React.useMemo(() => {
    return locations.find((loc) => loc.id === value);
  }, [locations, value]);

  const searchLocations = async (query: string) => {
    if (!query || query.length < 3) {
      setLocations([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          new URLSearchParams({
            q: `${query}, Greece`,
            format: "json",
            countrycodes: "gr",
            addressdetails: "1",
            limit: "15",
          }),
        {
          headers: {
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "TransferBookingApp/1.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const results: NominatimResult[] = await response.json();

      // Convert results and remove duplicates
      const formattedLocations = results.reduce<LocationOption[]>(
        (acc, result) => {
          const formatted = formatAddress(result);

          // Check if we already have this location
          const isDuplicate = acc.some(
            (loc) => loc.uniqueKey === formatted.uniqueKey
          );

          if (!isDuplicate) {
            acc.push({
              id: `${result.lat},${result.lon}`,
              name: formatted.name,
              description: formatted.description,
              lat: result.lat,
              lon: result.lon,
              uniqueKey: formatted.uniqueKey,
              isAirport: formatted.isAirport,
            });
          }

          return acc;
        },
        []
      );

      // Sort airports to the top if the search includes 'airport' or 'ath'
      const sortedLocations = formattedLocations.sort((a, b) => {
        if (a.isAirport && !b.isAirport) return -1;
        if (!a.isAirport && b.isAirport) return 1;
        return 0;
      });

      setLocations(sortedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = React.useMemo(
    () => debounce(searchLocations, 500),
    []
  );

  // Only search when query changes and is not empty
  React.useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  // Initialize ATH search for pickup only on mount
  React.useEffect(() => {
    if (isPickup && !value) {
      searchLocations("ATH");
    }
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLocation ? selectedLocation.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="py-6 text-center text-sm">Loading...</div>
              ) : searchQuery.length < 3 ? (
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
              {locations.map((location, index) => (
                <React.Fragment key={location.uniqueKey}>
                  {index > 0 && locations[index - 1].name === location.name && (
                    <div className="mx-2 my-1 border-t border-border" />
                  )}
                  <CommandItem
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
                </React.Fragment>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
