import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdbApi";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 shadow rounded">
      <img src={movie.Poster} className="w-64 mb-4" />
      <h1 className="text-2xl font-bold">{movie.Title}</h1>
      <p>{movie.Year} • {movie.Genre}</p>
      <p className="mt-2">{movie.Plot}</p>
      <p className="mt-2">⭐ {movie.imdbRating}</p>
    </div>
  );
}