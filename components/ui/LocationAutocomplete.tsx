"use client";

import { useState, useCallback } from "react";
import { MapPin, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { searchPlaces, getPlaceDetails, PlacePrediction } from "../../server_actions/googleSearchActions";
import debounce from "lodash.debounce";

interface LocationAutocompleteProps {
  value?: PlacePrediction & { coordinates?: { lat: number; lng: number } };
  onChange: (location: PlacePrediction & { coordinates?: { lat: number; lng: number } }) => void;
  isPickupLocation?: boolean;
}

export const LocationAutocomplete = ({ value, onChange, isPickupLocation = false }: LocationAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setLocations([]);
      return;
    }

    setIsLoading(true);

    try {
      // Use our server action to search Google Places API
      const results = await searchPlaces(searchQuery);
      setLocations(results);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectLocation = async (location: PlacePrediction) => {
    try {
      const details = await getPlaceDetails(location.place_id);
      if (details) {
        // Add coordinates to the location
        const locationWithCoordinates = {
          ...location,
          coordinates: details.coordinates,
        };
        onChange(locationWithCoordinates);
      } else {
        onChange(location);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      onChange(location);
    }
    setOpen(false);
  };

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      searchLocations(searchQuery);
    }, 300),
    [searchLocations]
  );

  const onValueChange = useCallback(
    (value: string) => {
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

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
                <div className="font-medium truncate">{value.structured_formatting.main_text}</div>
                <div className="text-xs text-muted-foreground truncate">{value.description}</div>
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
        <Command shouldFilter={false} className="bg-background">
          <CommandInput
            placeholder={isPickupLocation ? "Enter airport, hotel, or place..." : "Enter destination..."}
            value={query}
            onValueChange={onValueChange}
            className="h-10"
          />
          <CommandList className="max-h-[300px] overflow-auto">
            {isLoading && (
              <div className="py-6 text-center text-sm flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Searching...
              </div>
            )}

            {!isLoading && query.length < 2 && (
              <CommandEmpty>
                <div className="py-6 text-center text-sm">Type at least 2 characters to search for locations...</div>
              </CommandEmpty>
            )}

            {!isLoading && query.length >= 2 && locations.length === 0 && (
              <CommandEmpty>
                <div className="py-6 text-center text-sm">
                  No locations found. Try different spelling or more general terms.
                </div>
              </CommandEmpty>
            )}

            {!isLoading && locations.length > 0 && (
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={`${location.place_id}_${isPickupLocation ? "pickup" : "dropoff"}`}
                    value={location.place_id}
                    onSelect={() => handleSelectLocation(location)}
                    className="cursor-pointer py-3 data-[selected=true]:bg-card data-[highlighted=true]:bg-card"
                  >
                    <div className="flex items-start w-full overflow-hidden">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium text-sm truncate">{location.structured_formatting.main_text}</div>
                        <div className="text-xs text-foreground/70 truncate">{location.description}</div>
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
