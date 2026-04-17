import Link from "next/link";

import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import clsx from "clsx";

import FilmPreviewCard from "../MoviePreviewCard";

import { Movie } from "@/types/movie";

import styles from "./MoviesCarousel.module.scss";


interface MoviesCarouselProps{
  movies:Movie[]
}

const MoviesCarousel = ({
  movies
}:MoviesCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className={styles.carousel}>
      <div className={styles.wrapper}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          slidesPerView={2}
          spaceBetween={15}
          breakpoints={{
            600: {
              slidesPerView: 3,
            },
            769: {
              slidesPerView: 4,
            },
            1025: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className={styles.link}
                >
                  <FilmPreviewCard
                    title={movie.title}
                    src={movie.src}
                    alt={movie.alt}
                    rating={movie.rating}
                    year={movie.year}
                    variant="medium"
                  />
                </Link>
              </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={clsx(styles.button,styles.buttonLeft)}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Предыдущий слайд"
        />
        <button
          className={clsx(styles.button , styles.buttonRight)}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Следующий слайд"
        />
      </div>
    </div>
  );
};

export default MoviesCarousel;
