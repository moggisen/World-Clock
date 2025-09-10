import React, { useState } from "react";
import type { City, TimeZone } from "../types";
import { v4 as uuid } from "uuid";

interface AddCityFormProps {
  onAddCity: (city: City) => void;
}

// Lista med vanliga städer
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
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState<TimeZone | "">("");
  const [customTimezone, setCustomTimezone] = useState("");
  const [error, setError] = useState("");

  // När användaren väljer en tidszon från dropdown
  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tz = e.target.value as TimeZone;
    setTimezone(tz);
    setCustomTimezone("");
    setError("");

    const city = commonCities.find((c) => c.timezone === tz);
    if (city) setName(city.name);
  };

  // När användaren skriver i custom timezone
  const handleCustomTimezoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTimezone(e.target.value.trim());
    setTimezone(""); // rensa dropdown
    setError(""); // inget fel medan man skriver
  };

  // Validera custom timezone när användaren lämnar fältet
  const handleCustomTimezoneBlur = () => {
    const tz = customTimezone.trim();
    if (!tz) return setError("");

    try {
      new Intl.DateTimeFormat("en-US", { timeZone: tz }).format();
      setError(""); // giltig tidszon
    } catch {
      setError("Invalid timezone. Use format like 'Asia/Bangkok'.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tz = customTimezone.trim() || timezone;

    if (!name.trim() || !tz || error) return;

    onAddCity({ id: uuid(), name, timezone: tz as TimeZone });

    setName("");
    setTimezone("");
    setCustomTimezone("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add City</legend>

        {/* Dropdown med vanliga städer */}
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

        {/* Input för egen tidszon */}
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

        {/* Felmeddelande */}
       {error && <p className="error-message">{error}</p>}

        {/* Input för stadens namn */}
        <label>
          City name:
          <input
            type="text"
            value={name}
            placeholder="Ex: Berlin"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button type="submit">Add City</button>
      </fieldset>
    </form>
  );
};

export default AddCityForm;
