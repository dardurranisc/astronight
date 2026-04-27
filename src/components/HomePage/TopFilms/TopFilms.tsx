import { useSelector } from 'react-redux';

import { selectAllMovies } from '@/store/moviesSlice';

import Section from '@/components/common/Section';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import MoviesCarousel from '@/components/common/MoviesCarousel';

import { HEADING } from '@/constants/headingData';

import styles from './TopFilms.module.scss';

const TopFilms = () => {
  const allMovies = useSelector(selectAllMovies);

  const visibleCountMovies = 10;

  const sortedMovies = [...allMovies].sort((a, b) => b.rating - a.rating);

  const visibleMovies = sortedMovies.slice(0, visibleCountMovies);

  return (
    <>
      <Section>
        <Container>
          <div className={styles.main}>
            <SectionTitle text={HEADING.TOP_FILMS} mobileLeft />
            <MoviesCarousel movies={visibleMovies} />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TopFilms;
