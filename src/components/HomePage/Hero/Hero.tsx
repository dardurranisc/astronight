import Link from "next/link";

import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState} from "@/store";

import { setMovies } from "@/store/moviesSlice";

import useColumns from "../../../hooks/useColumns";

import Background from "@/components/common/Background";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import MoviePreviewCard from "@/components/common/MoviePreviewCard";

import styles from "./Hero.module.scss";

const Hero = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const userMovies = useSelector((state: RootState) => state.movies.userMovies);

  const countColumns = useColumns();
  const visibleCountMovies = countColumns * 2;

  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('userMovies');
    if (stored) {
      try {
        const userMoviesFromStorage = JSON.parse(stored);
        dispatch(setMovies(userMoviesFromStorage));
      } catch (e) {
        console.error('Ошибка парсинга userMovies', e);
      }
    }
  }, [dispatch]);

  const allMovies = [...userMovies, ...movies];
  const visibleMovies = allMovies.slice(0, visibleCountMovies);

  return (
    <Section>
      <Background
        alt="Moon"
        src="/images/hero/backgroundHero.jpg"
        priority
        fill
        opacity={0.9}
      />
      <Container>
        <div className={styles.main}>
          <h1 className={styles.title}>Trending Now</h1>
          <div className={styles.films}>
            {visibleMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className={styles.link}
              >
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
          <button className={styles.button} aria-label="See more">
            See more
          </button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
