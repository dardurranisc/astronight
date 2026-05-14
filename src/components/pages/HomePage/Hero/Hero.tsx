import Link from 'next/link';

import { useState } from 'react';

import { useSelector } from 'react-redux';

import { selectAllMovies } from '@/store/moviesSlice';

import useColumns from '@/hooks/useColumns';

import Background from '@components/Background';
import Section from '@components/Section';
import Container from '@components/Container';
import MoviePreviewCard from '@components/MoviePreviewCard';

import styles from './Hero.module.scss';

const Hero = () => {
  const allMovies = useSelector(selectAllMovies);
  const countColumns = useColumns();
  const rowsDefault = 2;

  const [visibleRows, setVisibleRows] = useState(rowsDefault);

  const defaultRowsMovies = allMovies.slice(0, countColumns * rowsDefault);
  const extraRowsMovies = allMovies.slice(countColumns * rowsDefault, countColumns * visibleRows);

  const visibleCountMovies = countColumns * visibleRows;

  const remainingMovies = allMovies.length - visibleCountMovies;
  const remainingRows = Math.ceil(remainingMovies / countColumns);
  const rowsToAdd = Math.min(rowsDefault, remainingRows);

  const handleSeeMore = () => {
    setVisibleRows((prev) => prev + rowsToAdd);
  };

  return (
    <Section>
      <div className={styles.heroTop}>
        <div className={styles.heroBackground}>
          <Background
            alt="Moon"
            src="/images/hero/backgroundHero.jpg"
            priority
            fill
            opacity={0.9}
          />
        </div>
        <Container>
          <div className={styles.main}>
            <h1 className={styles.title}>Trending Now</h1>
            <div className={styles.films}>
              {defaultRowsMovies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} className={styles.link}>
                  <MoviePreviewCard
                    title={movie.title}
                    src={movie.src}
                    alt={movie.alt}
                    rating={movie.rating}
                    year={movie.year}
                  />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className={styles.heroBottom}>
        <Container>
          {extraRowsMovies.length > 0 && (
            <div className={styles.films}>
              {extraRowsMovies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} className={styles.link}>
                  <MoviePreviewCard
                    title={movie.title}
                    src={movie.src}
                    alt={movie.alt}
                    rating={movie.rating}
                    year={movie.year}
                  />
                </Link>
              ))}
            </div>
          )}
          <button onClick={handleSeeMore} className={styles.button} aria-label="See more">
            See more
          </button>
        </Container>
      </div>
    </Section>
  );
};

export default Hero;
