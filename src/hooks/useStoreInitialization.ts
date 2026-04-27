import { useEffect } from 'react';

import { store } from '@/store';
import { loadFromLocalStorage } from '@/store/moviesSlice';

const useStoreInitialization = () => {
  useEffect(() => {
    try {
      const userMoviesStr = localStorage.getItem('userMovies');
      const editedBaseMoviesStr = localStorage.getItem('editBaseMovies');
      const deletedBaseMovieIdsStr = localStorage.getItem('deletedBaseMovieIds');

      const userMovies = userMoviesStr ? JSON.parse(userMoviesStr) : [];
      const editedBaseMovies = editedBaseMoviesStr ? JSON.parse(editedBaseMoviesStr) : {};
      const deletedBaseMovieIds = deletedBaseMovieIdsStr ? JSON.parse(deletedBaseMovieIdsStr) : [];

      store.dispatch(
        loadFromLocalStorage({
          userMovies: userMovies ? userMovies : [],
          editedBaseMovies: editedBaseMovies ? editedBaseMovies : {},
          deletedBaseMovieIds: deletedBaseMovieIds ?? [],
        })
      );
    } catch (error) {
      console.error('Ошибка чтения из localStorage', error);
    }
  }, []);
};

export default useStoreInitialization;
