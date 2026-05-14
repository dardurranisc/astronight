export type Movie = {
  id: number;
  title: string;
  src: string;
  alt: string;
  rating: number;
  year: number;
  director?: string;
  genre: string[];
  actors: string;
  description?: string;
};
