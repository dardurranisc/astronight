import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

store.subscribe(() => {
  if (typeof window === "undefined") return;
  const { userMovies } = store.getState().movies;
  try {
    localStorage.setItem("userMovies", JSON.stringify(userMovies));
  } catch (e) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      console.error("Хранилище заполнено");
    }
  } 
});

export type RootState = ReturnType<typeof store.getState>;
