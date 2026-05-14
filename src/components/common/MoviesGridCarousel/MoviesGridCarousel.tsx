import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';

import MoviePreviewCard from '@/components/common/MoviePreviewCard';

import { Movie } from '@/types/movie';

import styles from './MoviesGridCarousel.module.scss';

interface MoviesGridCarouselProps {
  sortedMovies: Movie[];
}

const MoviesGridCarousel = ({ sortedMovies }: MoviesGridCarouselProps) => {
  return (
    <div className={styles.movies}>
      <Swiper
        modules={[Grid, Pagination]}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={15}
        grid={{
          rows: 4,
          fill: 'row',
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          769: {
            spaceBetween: 53.33,
            slidesPerView: 4,
            slidesPerGroup: 4,
            grid: { rows: 2 },
          },
          1025: {
            spaceBetween: 20,
            slidesPerView: 4,
            slidesPerGroup: 4,
            grid: { rows: 2 },
          },
        }}
      >
        {sortedMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link key={movie.id} href={`/movie/${movie.id}`} className={styles.link}>
              <MoviePreviewCard
                title={movie.title}
                src={movie.src}
                alt={movie.alt}
                rating={movie.rating}
                year={movie.year}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesGridCarousel;
