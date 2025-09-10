import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { City } from "../types";
import TimeDisplay from "../components/TimeDisplay";
import defaultImg from "../assets/default.jpg";
import stockholmImg from "../assets/stockholm.jpg";
import parisImg from "../assets/paris.jpg";
import londonImg from "../assets/london.jpg";
import tokyoImg from "../assets/tokyo.jpg";
import sydneyImg from "../assets/sydney.jpg";
import shanghaiImg from "../assets/shanghai.jpg";
import newyorkImg from "../assets/newyork.jpg";
import losangelesImg from "../assets/losangeles.jpg";

// A map of city namnes to background images
const cityImages: Record<string, string> = {
  Stockholm: stockholmImg,
  Paris: parisImg,
  London: londonImg,
  "New York": newyorkImg,
  Tokyo: tokyoImg,
  Sydney: sydneyImg,
  Shanghai: shanghaiImg,
  "Los Angeles": losangelesImg,
};

const CityClockView: React.FC = () => {
  // Get the city id from the URL
  const { id } = useParams<{ id: string }>();
  // Load cities from local storage
  const [cities] = useLocalStorage<City[]>("cities", []);

  // Find the index of the city with this id
  const initialIndex = cities.findIndex((c) => c.id === id);
  // Keep track of which city is active
  const [activeIndex, setActiveIndex] = useState(
    initialIndex === -1 ? 0 : initialIndex
  );

  // If there are no cities or the id is not found -> show error message
  if (cities.length === 0 || initialIndex === -1) {
    return (
      <main style={{ textAlign: "center", padding: "2rem" }}>
        <p>City not found.</p>
        <Link to="/">Back</Link>
      </main>
    );
  }
  const currDate: Date = new Date();
  const dateStr: string = currDate.toDateString();

  // Get the active city and its background image
  const city = cities[activeIndex];
  const backgroundImage = cityImages[city.name] || defaultImg;

  // Get to previous city ( loop back if at start)
  const prevCity = () =>
    setActiveIndex((prev) => (prev === 0 ? cities.length - 1 : prev - 1));
  // Go to next city (loop back if at end)
  const nextCity = () =>
    setActiveIndex((prev) => (prev === cities.length - 1 ? 0 : prev + 1));

  return (
    <main
      className="city-detail"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <article className="city-detail-content">
        {/* City name  */}
        <h1 className="city-name-detail">{city.name}</h1>
        <p className="analog-date">{dateStr}</p>
        {/* Analog clock for this city  */}
        <TimeDisplay timezone={city.timezone} mode="analog" radius={165} />

        {/* Buttons to move betweeen cities  */}
        <section className="carousel">
          <button
            type="button"
            className="carousel-left"
            onClick={prevCity}
            aria-label="Previous city"
          >
            &#x279C;
          </button>
          <button
            type="button"
            className="carousel-right"
            onClick={nextCity}
            aria-label="Next city"
          >
            &#x279C;
          </button>
        </section>
        {/* Back link to home page */}
        <Link to="/" className="back-button">
          Back
        </Link>
      </article>
    </main>
  );
};

export default CityClockView;
