import movieSaga from './moviesSaga';

export default function* rootSaga() {
  yield movieSaga();
}
