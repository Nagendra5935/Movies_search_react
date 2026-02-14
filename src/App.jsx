import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MovieDetails from "./pages/MovieDetails";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <div>
      <nav className="bg-white shadow p-4 flex justify-between">
        <Link to="/" className="font-bold">Movie Search</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </div>
  );
}