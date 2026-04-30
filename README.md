# usePopcorn

> Minimal React app demonstrating custom hooks for fetching movies and persisting watched movies.

## Overview

usePopcorn is a small React project that queries the OMDB API and lets users rate and save movies they've watched. The app demonstrates several React hooks (built-in and custom) and simple component composition.

## Getting Started

- Install dependencies:

```bash
npm install
```

- Run locally:

```bash
npm start
```

> The app uses the OMDB API key embedded in `src/useMovies.js` (variable `KEY`). Replace it there if you want to use your own key.

## Custom Hooks (created in this project)

- `useMovies(query)` — `src/useMovies.js`
  - Fetches movies from the OMDB API for the given `query`.
  - Returns an object: `{ movies, error, isLoading }`.
  - Usage example:

```js
import { useMovies } from "./useMovies";
const { movies, error, isLoading } = useMovies(query);
```

- `useLocalStorageState(initialState, key)` — `src/useLocalStorageState.js`
  - A small wrapper around `useState` that persists state to `localStorage`.
  - Signature: `(initialState, key)` — pass a unique `key` to store the value.
  - Returns `[value, setValue]` just like `useState`.
  - Usage example:

```js
import { useLocalStorageState } from "./useLocalStorageState";
const [watched, setWatched] = useLocalStorageState([], "watchedMovies");
```

- `useKey(key, action)` — `src/useKey.js`
  - Attaches a global `keydown` listener and invokes `action()` when the pressed key matches `key` (case-insensitive).
  - Cleans up the listener on unmount.
  - Usage example:

```js
import { useKey } from "./useKey";
useKey("Escape", onCloseMovie);
```

## Built-in React Hooks Used

- `useState` — widely used across components for local component state (examples: `src/App.js`, `src/MovieDetails.js`, `src/StarRating.js`).
- `useEffect` — used for side effects such as fetching data, syncing localStorage, and attaching key listeners (`src/useMovies.js`, `src/useLocalStorageState.js`, `src/useKey.js`, `src/MovieDetails.js`).
- `useRef` — used to keep mutable values and DOM refs (examples: `src/App.js` Search input ref and `src/MovieDetails.js` counter ref).

## Where Hooks Appear (key files)

- Custom hooks:
  - [src/useMovies.js](src/useMovies.js)
  - [src/useLocalStorageState.js](src/useLocalStorageState.js)
  - [src/useKey.js](src/useKey.js)

- Components using hooks:
  - [src/App.js](src/App.js) — uses `useState`, `useRef`, `useMovies`, `useLocalStorageState`, `useKey` (via `Search`).
  - [src/MovieDetails.js](src/MovieDetails.js) — uses `useState`, `useRef`, `useEffect`, `useKey`.
  - [src/StarRating.js](src/StarRating.js) — uses `useState`.

## Notes & Suggestions

- `useLocalStorageState` expects a `key` string; pass a consistent key to avoid collisions in `localStorage`.
- The OMDB API key is currently hard-coded in `src/useMovies.js`; consider moving it to an environment variable for production use.

## License

This project is an example/demo — use freely for learning purposes.
