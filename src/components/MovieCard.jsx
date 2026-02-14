import { Link } from "react-router-dom";

export default function MovieCard({ movie, toggleFavorite, isFav }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col h-full">

      {/* Poster */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        className="w-full h-96 object-cover"
      />

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        <h2 className="font-bold text-white line-clamp-2 min-h-[48px]">
          {movie.Title}
        </h2>

        <p className="text-gray-400 text-sm mb-3">{movie.Year}</p>

        {/* Push buttons to bottom */}
        <div className="flex justify-between mt-auto">
          <Link to={`/movie/${movie.imdbID}`} className="text-blue-400 hover:underline">
            Details
          </Link>

          <button
            onClick={() => toggleFavorite(movie)}
            className="text-red-400 hover:underline"
          >
            {isFav ? "Remove" : "Fav"}
          </button>
        </div>
      </div>
    </div>
  );
}