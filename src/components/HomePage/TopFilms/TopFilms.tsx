import { useSelector } from "react-redux";
import { RootState } from "@/store";

import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import MoviesCarousel from "@/components/common/MoviesCarousel";

import { HEADING } from "@/constants/headingData";

import styles from "./TopFilms.module.scss";

const TopFilms = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const userMovies = useSelector((state: RootState) => state.movies.userMovies);

  const allMovies = [...userMovies, ...movies];
  const sortedMovies = [...allMovies].sort((a,b) => b.rating - a.rating)
  return (
    <>
      <Section>
        <Container>
          <div className={styles.main}>
            <SectionTitle text={HEADING.TOP_FILMS} mobileLeft />
            <MoviesCarousel movies={sortedMovies}/>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TopFilms;
