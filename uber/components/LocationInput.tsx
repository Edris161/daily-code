'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Input from './ui/Input';

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter location',
  error,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    // Fake location suggestions
    if (val.length > 0) {
      const fakeLocations = [
        'Downtown Station',
        'Airport Terminal',
        'Central Park',
        'Grand Central',
        'Madison Square Garden',
        'Times Square',
        'Brooklyn Bridge',
        'Statue of Liberty',
      ];
      const filtered = fakeLocations.filter((loc) =>
        loc.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
        <MapPin size={20} className="text-gray-600 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => value && setSuggestions([]) || setShowSuggestions(false)}
          placeholder={placeholder}
          className="flex-1 bg-gray-50 outline-none text-sm font-sans"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-700">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default LocationInput;
