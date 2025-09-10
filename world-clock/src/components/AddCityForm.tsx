import React, { useState } from "react";
import type { City, TimeZone } from "../types";
import { v4 as uuid } from "uuid";

interface AddCityFormProps {
  onAddCity: (city: City) => void;
}

// List with common cities (in a list )
const commonCities: { timezone: TimeZone; name: string; emoji: string }[] = [
  { timezone: "Europe/Stockholm", name: "Stockholm", emoji: "🇸🇪" },
  { timezone: "Europe/Paris", name: "Paris", emoji: "🇫🇷" },
  { timezone: "Europe/London", name: "London", emoji: "🇬🇧" },
  { timezone: "America/New_York", name: "New York", emoji: "🇺🇸" },
  { timezone: "America/Los_Angeles", name: "Los Angeles", emoji: "🇺🇸" },
  { timezone: "Asia/Tokyo", name: "Tokyo", emoji: "🇯🇵" },
  { timezone: "Asia/Shanghai", name: "Shanghai", emoji: "🇨🇳" },
  { timezone: "Australia/Sydney", name: "Sydney", emoji: "🇦🇺" },
];

const AddCityForm: React.FC<AddCityFormProps> = ({ onAddCity }) => {
  const [name, setName] = useState(""); // City name
  const [timezone, setTimezone] = useState<TimeZone | "">(""); // Timezone from dropdown
  const [customTimezone, setCustomTimezone] = useState(""); // Custom timezone input
  const [error, setError] = useState(""); // Error message

  // When user picks a timezone from the dropdown
  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tz = e.target.value as TimeZone;
    setTimezone(tz);
    setCustomTimezone("");
    setError("");

    // If the choosen timezone is in our list, auto-fill the city name
    const city = commonCities.find((c) => c.timezone === tz);
    if (city) setName(city.name);
  };

  // When user types a custom timezone
  const handleCustomTimezoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTimezone(e.target.value.trim());
    setTimezone(""); // Clear custom input
    setError(""); // clear error
  };

  // When user leaves the custom timezone field, if it is written wrong an error messages shows
  const handleCustomTimezoneBlur = () => {
    const tz = customTimezone.trim();
    if (!tz) return setError(""); // empty -> no error

    try {
      // Check if timezone i valid
      new Intl.DateTimeFormat("en-US", { timeZone: tz }).format();
      setError(""); // valid timezone -> no error message
    } catch {
      // Invalid timezone -> showa the error message
      setError("Invalid timezone. Use format like 'Asia/Bangkok'.");
    }
  };

  // When form i submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tz = customTimezone.trim() || timezone;

    // Stop if missing data or there is an error
    if (!name.trim() || !tz || error) return;

    // Send new city to parent component
    onAddCity({ id: uuid(), name, timezone: tz as TimeZone });

    // Reset form fields when a city has been added
    setName("");
    setTimezone("");
    setCustomTimezone("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend> WORLD CLOCK </legend> 

        {/* Dropdown mith common cities */}
        <label>
          Choose from list:
          <select value={timezone} onChange={handleTimezoneChange}>
            <option value="">-- Select timezone --</option>
            {commonCities.map((city) => (
              <option key={city.timezone} value={city.timezone}>
                {city.emoji} {city.name}
              </option>
            ))}
          </select>
        </label>

        {/* Input for custom timezone */}
        <label>
          Or type custom timezone:
          <input
            type="text"
            value={customTimezone}
            placeholder="Ex: Asia/Bangkok"
            onChange={handleCustomTimezoneChange}
            onBlur={handleCustomTimezoneBlur}
          />
        </label>

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Input for city name */}
        <label>
          City name:
          <input
            type="text"
            value={name}
            placeholder="Ex: Berlin"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Button to add a city  */}
        <button type="submit">Add City</button>
      </fieldset>
    </form>
  );
};

export default AddCityForm;
