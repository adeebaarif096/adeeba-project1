import "./Gallery.css";
import axios from "axios";
import { useState } from "react";

function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const searchImages = async () => {
    if (!query.trim()) {
      setImages([]);
      setMessage("Please enter something to search!");
      return;
    }

    try {
      setMessage("Loading...");
      setImages([]);

      const response = await axios.get(
       " https://api.unsplash.com/search/photos",
        {
          params: {
            query: query,
            per_page: 10,
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_Adeeba}`,
          },
        }
      );

      setImages(response.data.results);

      if (response.data.results.length === 0) {
        setMessage("Image Not Found!");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      setImages([]);
      setMessage("Something went wrong! Check your API key.");
    }
  };

  return (
    <div className="container">
      <h1>Image Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchImages()}
        />

        <button onClick={searchImages}>Search</button>
      </div>

      {message && <h2>{message}</h2>}

      <div className="image-grid">
        {images.map((image) => (
          <div className="card" key={image.id}>
            <img
              src={image.urls.small}
              alt={image.alt_description || "Image"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

