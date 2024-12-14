export type SortCriteria = 'popularity' | 'release_date' | 'vote_average' | 'title';
export type SortDirection = 'asc' | 'desc';

export interface FilterOptions {
  sortBy: SortCriteria;
  sortDirection: SortDirection;
  genre?: number;
  year?: number;
  minRating?: number;
  maxRating?: number;
}
