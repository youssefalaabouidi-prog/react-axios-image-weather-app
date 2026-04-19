import React, { useState } from "react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const suggestions = [
    "Nature",
    "City",
    "Cars",
    "Technology",
    "Animals",
    "Travel",
    "Food",
    "Ocean"
  ];

  const searchImages = async () => {
    if (!query) {
      setError("Veuillez entrer un mot clé ❗");
      setImages([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://pixabay.com/api/?key=55496711-984aa88db912597d5d3cebf11&q=${query}&image_type=photo`
      );

      if (res.data.hits.length === 0) {
        setError("Aucun résultat trouvé ❌");
      } else {
        setError("");
      }

      setImages(res.data.hits);
    } catch (err) {
      setError("Erreur lors de la recherche ❌");
      setImages([]);
    }
  };

  return (
    <div>
      <h2>🔎 Recherche Images</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="nature, ville..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchImages}>Search</button>
      </div>

      {/* Suggestions */}
      {query && (
        <div className="suggestions">
          {suggestions
            .filter((s) =>
              s.toLowerCase().includes(query.toLowerCase())
            )
            .map((s, index) => (
              <p key={index} onClick={() => setQuery(s)}>
                {s}
              </p>
            ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Images */}
      <div className="gallery">
        {images.map((img) => (
          <div className="img-card" key={img.id}>
            <img src={img.webformatURL} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;