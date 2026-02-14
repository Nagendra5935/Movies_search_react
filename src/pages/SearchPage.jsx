// import { useState } from "react";
// import { searchMovies } from "../services/omdbApi";
// import MovieCard from "../components/MovieCard";
// import useFavorites from "../hooks/useFavorites";

// export default function SearchPage() {
//   const [query, setQuery] = useState("");
//   const [type, setType] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [error, setError] = useState("");

//   const { favorites, toggleFavorite } = useFavorites();

//   const handleSearch = async (p = 1) => {
//     const data = await searchMovies(query, type, p);

//     if (data.Response === "True") {
//       setMovies(data.Search);
//       setPage(p);
//       setError("");
//     } else {
//       setMovies([]);
//       setError(data.Error);
//     }
//   };

//   return (
//     <div>
//       <div className="flex gap-2 mb-4">
//         <input
//           className="border p-2 flex-1"
//           placeholder="Search movie..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />

//         <select
//           className="border p-2"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="movie">Movie</option>
//           <option value="series">Series</option>
//           <option value="episode">Episode</option>
//         </select>

//         <button
//           onClick={() => handleSearch(1)}
//           className="bg-blue-500 text-white px-4"
//         >
//           Search
//         </button>
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {movies.map((m) => (
//           <MovieCard
//             key={m.imdbID}
//             movie={m}
//             toggleFavorite={toggleFavorite}
//             isFav={favorites.some((f) => f.imdbID === m.imdbID)}
//           />
//         ))}
//       </div>

//       {movies.length > 0 && (
//         <div className="flex justify-center gap-4 mt-4">
//           <button onClick={() => handleSearch(page - 1)} disabled={page === 1}>
//             Prev
//           </button>
//           <button onClick={() => handleSearch(page + 1)}>Next</button>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();

  // 🔹 Common fetch function
  const fetchMovies = async (query = "Avengers", selectedType = "", p = 1) => {
    try {
      setLoading(true);
      setError("");

      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${p}`;

      if (selectedType) {
        url += `&type=${selectedType}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setPage(p);
      } else {
        setMovies([]);
        setError(data.Error || "No results found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Default load on page open
  useEffect(() => {
    fetchMovies(); // loads "Avengers"
  }, []);

  // 🔹 Search typing handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const query = value.trim() || "Avengers";
    fetchMovies(query, type, 1);
  };

  // 🔹 Dropdown filter handler
  const handleTypeChange = (e) => {
    const selected = e.target.value;
    setType(selected);

    const query = searchText.trim() || "Avengers";
    fetchMovies(query, selected, 1);
  };

  // 🔹 Pagination
  const goToPage = (newPage) => {
    if (newPage < 1) return;

    const query = searchText.trim() || "Avengers";
    fetchMovies(query, type, newPage);
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {/* 🔹 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search movies..."
          value={searchText}
          onChange={handleSearchChange}
          className="p-3 rounded bg-white text-black border border-gray-400 w-full"
        />

        {/* Dropdown */}
        <select
          value={type}
          onChange={handleTypeChange}
          className="p-3 rounded bg-white text-black border border-gray-400 w-40"
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      {/* 🔹 Loading */}
      {loading && (
        <p className="text-center text-gray-400 mt-10">Loading movies...</p>
      )}

      {/* 🔹 Error */}
      {!loading && error && (
        <p className="text-center text-red-500 mt-10">{error}</p>
      )}

      {/* 🔹 Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              toggleFavorite={toggleFavorite}
              isFav={favorites.some((f) => f.imdbID === movie.imdbID)}
            />
          ))}
        </div>
      )}

      {/* 🔹 Pagination */}
      {!loading && movies.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-white font-semibold">Page {page}</span>

          <button
            onClick={() => goToPage(page + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}