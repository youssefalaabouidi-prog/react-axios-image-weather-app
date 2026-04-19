import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const cities = [
    "Paris",
    "London",
    "Casablanca",
    "Rabat",
    "Marrakech",
    "New York",
    "Tokyo",
    "Dubai"
  ];

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0d2fd82c9a6e67602c807885181a307d&units=metric`
      );
      setWeather(res.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("Ville non trouvée ❌");
    }
  };

  return (
    <div>
      <h2>🌤️ Météo en Temps Réel</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Entrez une ville..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Afficher</button>
      </div>

      {/* Suggestions */}
      {city && (
        <div className="suggestions">
          {cities
            .filter((c) =>
              c.toLowerCase().includes(city.toLowerCase())
            )
            .map((c, index) => (
              <p key={index} onClick={() => setCity(c)}>
                {c}
              </p>
            ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Weather */}
      {weather && (
        <div className="weather-card">
          <div>
            <h3>{weather.name}</h3>
            <p>{weather.weather[0].description}</p>
          </div>

          <div className="temp">
            {weather.main.temp}°C
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;