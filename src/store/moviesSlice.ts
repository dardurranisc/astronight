import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { Movie } from '@/types/movie';

interface MoviesState {
  baseMovies: Movie[];
}

const initialState: MoviesState = {
  baseMovies: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.baseMovies = action.payload;
    },

    addMovie: (state, action: PayloadAction<Movie>) => {
      state.baseMovies = [action.payload, ...state.baseMovies];
    },

    updateMovie: (state, action: PayloadAction<Movie>) => {
      const updatedMovie = action.payload;
      const updatedId = String(updatedMovie.id);

      const index = state.baseMovies.findIndex((movie) => String(movie.id) === updatedId);

      if (index !== -1) {
        state.baseMovies[index] = updatedMovie;
      }
    },

    deleteMovie: (state, action: PayloadAction<string | number>) => {
      const movieId = String(action.payload);
      state.baseMovies = state.baseMovies.filter((movie) => String(movie.id) !== movieId);
    },
  },
});

export const { setMovies, addMovie, updateMovie, deleteMovie } = moviesSlice.actions;

const selectBaseMovies = (state: RootState) => state.movies.baseMovies;

export const selectAllMovies = selectBaseMovies;

export default moviesSlice.reducer;
