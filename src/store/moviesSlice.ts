import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/types/movie";
import { moviesTrendingData } from "../constants/moviesTrendingData";

interface MoviesState {
  movies: Movie[];
  userMovies:Movie[];
}

const initialState: MoviesState = {
  movies: moviesTrendingData,
  userMovies:[]
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.userMovies.unshift(action.payload);
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.userMovies = action.payload;
    },
  },
});

export const { addMovie, setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
