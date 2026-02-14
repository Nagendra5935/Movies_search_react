const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE = "https://www.omdbapi.com/";

export async function searchMovies(query, type = "", page = 1) {
  if (!query) return { Response: "False", Error: "Enter search text" };

  let url = `${BASE}?apikey=${API_KEY}&s=${query}&page=${page}`;

  // SERVER-SIDE FILTER (NO array.filter)
  if (type) url += `&type=${type}`;

  const res = await fetch(url);
  return res.json();
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE}?apikey=${API_KEY}&i=${id}&plot=full`);
  return res.json();
}