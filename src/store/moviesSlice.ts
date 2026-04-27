import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { RootState } from './index';

import { Movie } from '@/types/movie';

import { moviesTrendingData } from '@/constants/moviesTrendingData';

interface MoviesState {
  baseMovies: Movie[];
  userMovies: Movie[];
  editedBaseMovies: Record<string, Movie>;
  deletedBaseMovieIds: string[];
}

const initialState: MoviesState = {
  baseMovies: moviesTrendingData,
  userMovies: [],
  editedBaseMovies: {},
  deletedBaseMovieIds: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    loadFromLocalStorage: (
      state,
      action: PayloadAction<{
        userMovies?: Movie[];
        editedBaseMovies?: Record<string, Movie>;
        deletedBaseMovieIds?: string[];
      }>
    ) => {
      state.userMovies = action.payload.userMovies ?? [];
      state.editedBaseMovies = action.payload.editedBaseMovies ?? {};
      state.deletedBaseMovieIds = action.payload.deletedBaseMovieIds ?? [];
    },

    addMovie: (state, action: PayloadAction<Movie>) => {
      state.userMovies = [action.payload, ...state.userMovies];
    },

    updateMovie: (state, action: PayloadAction<Movie>) => {
      const updatedMovie = action.payload;
      const updatedId = String(updatedMovie.id);

      const baseMovieId = state.baseMovies.findIndex((movie) => String(movie.id) === updatedId);

      if (baseMovieId !== -1) {
        state.editedBaseMovies[updatedId] = updatedMovie;
        return;
      } else {
        state.userMovies = state.userMovies.map((movie) =>
          String(movie.id) === updatedId ? updatedMovie : movie
        );
      }
    },
    deleteMovie: (state, action: PayloadAction<string | number>) => {
      const movieId = String(action.payload);

      const baseMovieExists = state.baseMovies.some((movie) => String(movie.id) === movieId);

      if (baseMovieExists) {
        if (!state.deletedBaseMovieIds.includes(movieId)) {
          state.deletedBaseMovieIds.push(movieId);
        }

        delete state.editedBaseMovies[movieId];
        return;
      }

      state.userMovies = state.userMovies.filter((movie) => String(movie.id) !== movieId);
    },
  },
});

export const { loadFromLocalStorage, addMovie, updateMovie, deleteMovie } = moviesSlice.actions;

const selectBaseMovies = (state: RootState) => state.movies.baseMovies;
const selectUserMovies = (state: RootState) => state.movies.userMovies;
const selectEditedBaseMovies = (state: RootState) => state.movies.editedBaseMovies;
const selectDeletedBaseMovieIds = (state: RootState) => state.movies.deletedBaseMovieIds;

export const selectAllMovies = createSelector(
  [selectBaseMovies, selectUserMovies, selectEditedBaseMovies, selectDeletedBaseMovieIds],
  (baseMovies, userMovies, editedBaseMovies, deletedBaseMovieIds): Movie[] => {
    const mergedBaseMovies = baseMovies
      .filter((movie) => !deletedBaseMovieIds.includes(String(movie.id)))
      .map((movie) => {
        const replacedBaseMovie = editedBaseMovies[String(movie.id)];
        return replacedBaseMovie ?? movie;
      });

    return [...userMovies, ...mergedBaseMovies];
  }
);

export default moviesSlice.reducer;
