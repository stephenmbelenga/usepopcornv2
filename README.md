# usePopcorn

Minimal React demo showing custom hooks for fetching movies and persisting watched movies.

## Overview

`usePopcorn` is a small React app that queries the OMDB API, lets users rate movies, and saves watched movies to localStorage. It's intended as a learning example for custom hooks and simple component composition.

## Features

- Search movies via the OMDB API
- View movie details and add personal ratings
- Persist watched movies in `localStorage`
- Small set of custom hooks: `useMovies`, `useLocalStorageState`, `useKey`

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm start
```

3. Open http://localhost:3000 in your browser.

## Scripts

- `npm start` — Run the app in development mode
- `npm run build` — Create a production build
- `npm test` — Run tests (if configured)

## Environment

The OMDB API key is currently defined in `src/useMovies.js` as the `KEY` variable. For development, you can either:

- Replace the `KEY` value in `src/useMovies.js` with your API key, or
- Update the code to read from an environment variable (recommended for production).

Example using `.env` (create a `.env` file at project root):

```env
REACT_APP_OMDB_KEY=your_api_key_here
```

Then update `src/useMovies.js` to read `process.env.REACT_APP_OMDB_KEY`.

## Custom Hooks

- `useMovies(query)` — `src/useMovies.js`: fetches movies from OMDB and returns `{ movies, error, isLoading }`.
- `useLocalStorageState(initialState, key)` — `src/useLocalStorageState.js`: `useState` persisted to `localStorage`.
- `useKey(key, action)` — `src/useKey.js`: adds a global keydown listener and triggers `action()` when matched.

## Files of Interest

- [src/App.js](src/App.js)
- [src/useMovies.js](src/useMovies.js)
- [src/useLocalStorageState.js](src/useLocalStorageState.js)
- [src/MovieDetails.js](src/MovieDetails.js)

## Contributing

Feel free to open issues or PRs. If you plan to extend the app, consider:

- Moving the API key to environment variables
- Adding tests for custom hooks

## License

Example/demo project — free to use for learning and experimentation.
