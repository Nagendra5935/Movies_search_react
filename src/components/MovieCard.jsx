import { Link } from "react-router-dom";

export default function MovieCard({ movie, toggleFavorite, isFav }) {
  return (
    <div className="bg-white shadow rounded p-2">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : ""}
        alt={movie.Title}
        className="h-64 w-full object-cover"
      />

      <h2 className="font-bold mt-2">{movie.Title}</h2>
      <p className="text-sm">{movie.Year}</p>

      <div className="flex justify-between mt-2">
        <Link to={`/movie/${movie.imdbID}`} className="text-blue-500">
          Details
        </Link>

        <button
          onClick={() => toggleFavorite(movie)}
          className="text-red-500"
        >
          {isFav ? "Remove" : "Fav"}
        </button>
      </div>
    </div>
  );
}