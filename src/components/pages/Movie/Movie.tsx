import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import clsx from 'clsx';

import { RootState } from '@/store';

import { selectAllMovies } from '@/store/moviesSlice';

import MovieModal from '@components/MovieModal';
import Background from '@components/Background';
import Section from '@components/Section';
import Container from '@components/Container';
import AddSomething from '@components/AddSomething';

import { formatRating } from '@/utils/formatRating';

import styles from './Movie.module.scss';

const Movie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const router = useRouter();
  const movieId = router.query.id;

  const movie = useSelector((state: RootState) => {
    if (!movieId) return undefined;

    const allMovies = selectAllMovies(state);
    return allMovies.find((m) => String(m.id) === String(movieId));
  });

  const memoActors = useMemo(() => {
    return movie?.actors?.split(',');
  }, [movie?.actors]);

  const isLimitActors = useMemo(() => {
    return (memoActors?.length ?? 0) > 3;
  }, [memoActors]);

  const displayedActors = useMemo(() => {
    if (!memoActors) return [];
    if (!isLimitActors) return memoActors;
    return isOpen ? memoActors : memoActors.slice(0, 3);
  }, [memoActors, isLimitActors, isOpen]);

  return (
    <div className={styles.content}>
      <Background
        variant="fixed"
        src="/images/moviePage/background.png"
        alt="forest"
        fill
        priority
      />
      <Section>
        <Container variant="secondary">
          <div className={styles.block}>
            <div className={styles.blockHeader}>
              <div className={styles.heading}>
                <h3>{movie?.title}</h3>
                <span>[{movie?.year}]</span>
              </div>
              <button className={styles.edit} onClick={() => setIsAddModalOpen(true)}>
                <img src="/images/icons/edit.svg" alt="Edit" />
              </button>
              {movie && (
                <MovieModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  initialMovie={movie}
                />
              )}
            </div>
            <div className={styles.blockMain}>
              <div className={styles.blockImage}>
                <img src={movie?.src} className={styles.preview} alt={movie?.alt} />
                <span className={styles.rating}>
                  <img className={styles.star} src="/images/hero/icons/star.svg" alt="Star" />
                  {formatRating(movie?.rating)}
                </span>
              </div>
              <div className={styles.blockInformation}>
                <div className={styles.genresBlock}>
                  {movie?.genre?.map((g) => (
                    <div key={g} className={styles.genresList}>
                      {g}
                    </div>
                  ))}
                </div>
                <div className={styles.actors}>
                  <div className={styles.actorsList}>
                    {displayedActors.map((actor, index) => (
                      <span key={index} className={styles.actor}>
                        {actor}
                      </span>
                    ))}
                  </div>
                  {isLimitActors && (
                    <button
                      className={clsx(styles.actorsMore, isOpen && styles.opening)}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <img src="/images/arrow/arrowDown.svg" alt="arrow" />
                    </button>
                  )}
                </div>
                <div className={styles.director}>Director: {movie?.director}</div>
                <div className={styles.description}>{movie?.description}</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className={styles.wrapper}>
            <AddSomething />
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Movie;
