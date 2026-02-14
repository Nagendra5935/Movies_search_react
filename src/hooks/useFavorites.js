import { useState, useEffect } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    if (favorites.find((m) => m.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter((m) => m.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return { favorites, toggleFavorite };
}