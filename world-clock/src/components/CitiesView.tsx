import React from "react";
import type { City } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AddCityForm } from "../components/AddCityForm";
import TimeDisplay from "./TimeDisplay";
import { Link } from "react-router-dom";

const CitiesView: React.FC = () => {
  const [cities, setCities] = useLocalStorage<City[]>("cities", []);

  // Add a city if it doesn't already exist
  const addCity = (city: City) => {
    const exists = cities.some(
      (c) =>
        c.name.toLowerCase() === city.name.toLowerCase() &&
        c.timezone === city.timezone
    );
    if (!exists) setCities([...cities, city]);
  };
  // Remove a city by ID
  const removeCity = (id: string) => {
    setCities(cities.filter((c) => c.id !== id));
  };

  return (
    <section className="cities-view">
      {/* Sidebar with the form for adding cities */}
      <aside className="overlay">
        <AddCityForm onAddCity={addCity} />
      </aside>

      {/* List of city cards with digital clocks */}
      <ul className="scroll-list">
        {cities.map((city) => (
          <li key={city.id} className="city-item">
            <h2 className="city-name">{city.name}</h2>
            {/* Digital clock for the city */}
            <time className="digital-clock">
              <TimeDisplay
                timezone={city.timezone}
                mode="digital"
                radius={80}
              />
            </time>
            {/* Link to view the city's analog clock */}
            <nav>
              <Link to={`/city/${city.id}`} className="analog-link">
                Visa analog klocka
              </Link>
            </nav>
            {/* Button to remove a city */}
            <button type="button" onClick={() => removeCity(city.id)}>
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CitiesView;
