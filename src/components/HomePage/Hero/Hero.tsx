import Link from 'next/link';

import { useState } from 'react';

import { useSelector } from 'react-redux';

import { selectAllMovies } from '@/store/moviesSlice';

import useColumns from '../../../hooks/useColumns';

import Background from '@/components/common/Background';
import Section from '@/components/common/Section';
import Container from '@/components/common/Container';
import MoviePreviewCard from '@/components/common/MoviePreviewCard';

import styles from './Hero.module.scss';

const Hero = () => {
  const allMovies = useSelector(selectAllMovies);
  const countColumns = useColumns();
  const rowsDefault = 2;

  const [visibleRows, setVisibleRows] = useState(2);

  const visibleCountMovies = countColumns * visibleRows;
  const visibleMovies = allMovies.slice(0, visibleCountMovies);
  const remainingMovies = allMovies.length - visibleCountMovies;

  const remainingRows = Math.ceil(remainingMovies / countColumns);
  const rowsToAdd = Math.min(rowsDefault, remainingRows);

  const handleSeeMore = () => {
    setVisibleRows((prev) => prev + rowsToAdd);
  };

  return (
    <Section>
      <div className={styles.hero}>
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
              {visibleMovies.map((movie) => (
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
            <button onClick={handleSeeMore} className={styles.button} aria-label="See more">
              See more
            </button>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default Hero;
