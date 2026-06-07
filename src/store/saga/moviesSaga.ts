import { PayloadAction } from '@reduxjs/toolkit';

import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getMoviesApi, addMovieApi, updateMovieApi, deleteMovieApi } from '@/api/movieApi';
import { setMovies, addMovie, updateMovie, deleteMovie } from '@/store/moviesSlice';

import { Movie } from '@/types/movie';

function* setMoviesWorker(): SagaIterator {
  try {
    const movies = yield call(getMoviesApi);
    const sortedMovies = [...movies].sort((a, b) => (b.extraId || 0) - (a.extraId || 0));
    yield put(setMovies(sortedMovies));
  } catch (error) {
    console.log('Error loading movies', error);
  }
}

function* setMoviesWatcher() {
  yield takeLatest('movieRequest', setMoviesWorker);
}

function* addMovieWorker(action: PayloadAction<Movie>) {
  try {
    const newMovie: Movie = yield call(addMovieApi, action.payload);
    yield put(addMovie(newMovie));
  } catch (error) {
    console.log('Error during add movie', error);
  }
}

function* addMovieWatcher() {
  yield takeLatest('addMovieRequest', addMovieWorker);
}

function* updateMovieWorker(action: PayloadAction<Movie>) {
  try {
    yield call(updateMovieApi, action.payload);
    yield put(updateMovie(action.payload));
  } catch (error) {
    console.log('Error during update movie', error);
  }
}

function* updateMovieWatcher() {
  yield takeLatest('updateMovieRequest', updateMovieWorker);
}

function* deleteMovieWorker(action: PayloadAction<number | string>) {
  try {
    yield call(deleteMovieApi, action.payload);
    yield put(deleteMovie(action.payload));
  } catch (error) {
    console.log('Error during delete movie', error);
  }
}

function* deleteMovieWatcher() {
  yield takeLatest('deleteMovieRequest', deleteMovieWorker);
}

export default function* movieSaga() {
  yield all([setMoviesWatcher(), addMovieWatcher(), updateMovieWatcher(), deleteMovieWatcher()]);
}
