import { useState } from "react";
import { searchMovies } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const { favorites, toggleFavorite } = useFavorites();

  const handleSearch = async (p = 1) => {
    const data = await searchMovies(query, type, p);

    if (data.Response === "True") {
      setMovies(data.Search);
      setPage(p);
      setError("");
    } else {
      setMovies([]);
      setError(data.Error);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="border p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <button
          onClick={() => handleSearch(1)}
          className="bg-blue-500 text-white px-4"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            toggleFavorite={toggleFavorite}
            isFav={favorites.some((f) => f.imdbID === m.imdbID)}
          />
        ))}
      </div>

      {movies.length > 0 && (
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => handleSearch(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <button onClick={() => handleSearch(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}