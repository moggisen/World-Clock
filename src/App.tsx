import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CitiesView from "./components/CitiesView";
import CityClockView from "./components/CityClockView";
import worldImg from "./assets/world.jpg";
import "./App.css";

// Wrapper component for the home page
const HomePage = () => (
  <section
    className="app city-view"
    style={{
      backgroundImage: `url(${worldImg})`,
    }}
  >
    <CitiesView />
  </section>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:id" element={<CityClockView />} />
      </Routes>
    </Router>
  );
};

export default App;