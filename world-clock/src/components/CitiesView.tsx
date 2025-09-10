import React from "react";
import type { City } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AddCityForm from "../components/AddCityForm";
import TimeDisplay from "../components/TimeDisplay";
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
  const currDate: Date = new Date();
  const dateStr: string = currDate.toDateString();
  

  return (
    <section className="city-list">
      {/* Overlay för formuläret */}
      <article className="overlay">
        <AddCityForm onAddCity={addCity} />
      </article>

      {/* Grid med digitala klockor */}
      <section className="scroll-list">
        {cities.map((city) => (
          <article key={city.id} className="city-item">
            <span className="city-name">{city.name}</span>
            <p className="digital-date">{dateStr}</p>
            <span className="digital-clock">
              <TimeDisplay
                timezone={city.timezone}
                mode="digital"
                radius={80}
              />{" "}
            </span>
            <Link to={`/city/${city.id}`} className="analog-link">
              Show analog clock
            </Link>
            <button onClick={() => removeCity(city.id)}>Delete</button>
          </article>
        ))}
      </section>
    </section>
  );
};

export default CitiesView;
