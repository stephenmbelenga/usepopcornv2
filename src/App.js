import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import Loader from "./Loader";

//
import { useState, useRef } from "react";

// custom Hooks
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

// App Component
export default function App() {
  const [query, setQuery] = useState("game");
  const [selectedId, setSelectedId] = useState(null);

  // Custom hooks
  const { movies, error, isLoading } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([]);

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <div>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
        )}
        {error && <ErrorMessage message={error} />}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <p>
        <span>🚫 </span>
        {message}
      </p>
    </div>
  );
}

// NavBar Component
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

// Logo Component
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

// Search Component
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  // Custom Hook
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
// Num-Results Component
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// Main Component
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// List Box Component

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
