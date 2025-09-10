import React, { useState } from "react";
import type { City, TimeZone } from "../types";
import { v4 as uuid } from "uuid";

interface AddCityFormProps {
  onAddCity: (city: City) => void; // Function to add a new city
}

// List of common cities with their timezone, name and flag emoji
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
  const [name, setName] = useState(""); // City name input
  const [timezone, setTimezone] = useState<TimeZone | "">(""); // Dropdown selected timezone
  const [customTimezone, setCustomTimezone] = useState(""); // Cusutom timezone input
  const [error, setError] = useState(""); // Error message if timezone is invalid

  // When user selects a timezone from the dropdown
  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tz = e.target.value as TimeZone;
    setTimezone(tz);
    setCustomTimezone(""); // Clear custom timezone input
    setError(""); // Clear any previous error

    // Auto-fill the city name if it matches a known city
    const city = commonCities.find((c) => c.timezone === tz);
    if (city) setName(city.name);
  };

  // When user types a custom timezone
  const handleCustomTimezoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tz = e.target.value.trim();
    setCustomTimezone(tz);
    setTimezone(""); // Clear dropdown selection

    if (tz === "") {
      setError(""); // Clear error if input is empty
      return;
    }

    // Check if the typed timezone exists in commonCities
    const match = commonCities.find(
      (c) => c.timezone.toLowerCase() === tz.toLowerCase()
    );

    if (match) {
      setName(match.name); // Auto-fill name if match found
      setError(""); // Clear error
    } else {
      setError("Invalid timezone. Use format like 'Asia/Bangkok'."); // Show error if not vaild
    }
  };

  // When the form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tz = customTimezone.trim() || timezone; // Use custom timezone if filled

    // Prevent submission if namne or timezone is empty or there's an error
    if (!name.trim() || !tz || error) return;

    onAddCity({ id: uuid(), name, timezone: tz as TimeZone });

    // Reset all input fields
    setName("");
    setTimezone("");
    setCustomTimezone("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add City</legend>

        {/* Dropdown to select common city/timezone  */}
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
          />
        </label>

        {/* Show error message if timezone is invalid  */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Input for city name (auto-filled or manual) */}
        <label>
          City name:
          <input
            type="text"
            value={name}
            placeholder="Ex: Berlin"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button type="submit">Add</button>
      </fieldset>
    </form>
  );
};

export default AddCityForm;
