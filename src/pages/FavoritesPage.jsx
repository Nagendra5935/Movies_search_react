import useFavorites from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (!favorites.length) return <p>No favorites yet.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.map((m) => (
        <MovieCard
          key={m.imdbID}
          movie={m}
          toggleFavorite={toggleFavorite}
          isFav={true}
        />
      ))}
    </div>
  );
}