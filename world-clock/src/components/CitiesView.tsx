import type { City } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AddCityForm from "../components/AddCityForm";
import TimeDisplay from "../components/TimeDisplay";
import { Link } from "react-router-dom";

const CitiesView = () => {
    // Load list of citites from localStorage 
  const [cities, setCities] = useLocalStorage<City[]>("cities", []);

  // Function to add a new city
  // Only adds if the city does not already exist
  const addCity = (city: City) => {
    const exists = cities.some(
      (c) =>
        c.name.toLowerCase() === city.name.toLowerCase() &&
        c.timezone === city.timezone
    );
    if (!exists) setCities([...cities, city]);
  };
  // Function to remove a city using its unique ID 
  const removeCity = (id: string) => {
    setCities(cities.filter((c) => c.id !== id));
  };
  // Get today's date (Show on each city card)
  const currDate: Date = new Date();
  const dateStr: string = currDate.toDateString();
  

  return (
    <section className="city-list">
      {/* Form for adding a new city */}
      <article className="overlay">
        <AddCityForm onAddCity={addCity} />
      </article>

      {/* List of all saved citiet  */}
      <section className="cities-list">
        {cities.map((city) => (
          <article key={city.id} className="city-item">
            {/* City name */}
            <span className="city-name">{city.name}</span>
            {/* Current date  */}
            <p className="digital-date">{dateStr}</p>
            {/* Digital clock for the city  */}
            <span className="digital-clock">
              <TimeDisplay
                timezone={city.timezone}
                mode="digital"
                radius={80}
              />{" "}
            </span>
            {/* Link to analog clock view  */}
            <Link to={`/city/${city.id}`} className="analog-link">
              Show analog clock
            </Link>
            {/* Button to delete the city  */}
            <button onClick={() => removeCity(city.id)}>Delete</button>
          </article>
        ))}
      </section>
    </section>
  );
};

export default CitiesView;
