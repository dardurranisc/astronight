import { SortField } from '@/types/sorting';

type Sort = {
  id: number;
  name: SortField;
};

export const sortData: Sort[] = [
  { id: 1, name: 'title' },
  { id: 2, name: 'year' },
  { id: 3, name: 'rating' },
];
