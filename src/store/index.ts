import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const { userMovies, editedBaseMovies, deletedBaseMovieIds } = store.getState().movies;
      localStorage.setItem('userMovies', JSON.stringify(userMovies));
      localStorage.setItem('editBaseMovies', JSON.stringify(editedBaseMovies));
      localStorage.setItem('deletedBaseMovieIds', JSON.stringify(deletedBaseMovieIds));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('LocalStorage переполнен');
      } else {
        console.error('Ошибка записи в localStorage', error);
      }
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
