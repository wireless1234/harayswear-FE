"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceChanged?: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  className?: string;
  name?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onPlaceChanged,
  placeholder = "Enter your address",
  className = "",
  name,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        // Check if we have an API key
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          console.warn('Google Maps API key not found. Address autocomplete will not be available.');
          return;
        }

        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.load();
        setIsLoaded(true);

        if (inputRef.current && !autocompleteRef.current) {
          // Initialize autocomplete with options focused on Australian addresses
          autocompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            {
              types: ['address'],
              componentRestrictions: { country: 'AU' }, // Restrict to Australia
              fields: [
                'address_components',
                'formatted_address',
                'geometry',
                'name',
                'place_id'
              ],
            }
          );

          // Listen for place selection
          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.formatted_address) {
              onChange(place.formatted_address);
              onPlaceChanged?.(place);
            }
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        console.warn('Fallback to regular text input for address field.');
      }
    };

    initializeAutocomplete();

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange, onPlaceChanged]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      {!isLoaded && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
