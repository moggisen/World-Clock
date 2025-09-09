import React, { useState } from "react";
import type { City, TimeZone } from "uuid";
import { v4 as uuid } from "uuid";

interface AddCityFormProps {
  onAddCity: (city: City) => void;
}

const commonTimeZones: TimeZone[] = [
  "Europe/Stockholm",
  "Europe/Paris",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

const AddCityForm: React.FC<AddCityFormProps> = ({ onAddCity }) => {
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState<TimeZone | "">("");
  const [customTimezone, setCutsomTimezone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tz = customTimezone.trim() || timezone;
    if (!name.trim() || !tz) return;

    onAddCity({ id: uuid(), name, timezone: tz as TimeZone });
    setName("");
    setTimezone("");
    setCutsomTimezone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Lägg till stad</legend>
        <label>
          Stadens namn:
          <input
            type="text"
            value={name}
            placeholder="Ex: Berlin"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Välj tidzon:
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value as TimeZone)}
          >
            <option value=""> -- Välj tidszon --</option>
            {commonTimeZones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>

        <label>
          eller skriv egen tidszon:
          <input
            type="text"
            value={customTimezone}
            placeholder="Ex: Asia/Bangkok"
            onChange={(e) => setCutsomTimezone(e.target.value)}
          />
        </label>

        <button type="submit">Lägg till</button>
      </fieldset>
    </form>
  );
};

export default AddCityForm;
