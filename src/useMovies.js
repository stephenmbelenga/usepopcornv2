// Custom hook
import { useState, useEffect } from "react";

// OMDB API Key
// Read from environment variable (Create React App: REACT_APP_...)
// Falls back to the hard-coded key if the env var is not set.
const KEY = process.env.API_KEY || "908fe109";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok)
          throw new Error("Something went wrong, failed to fetch movies.");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found!");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        // Ignore Abort Errors
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    // handleCloseMovie();
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, error, isLoading };
}
