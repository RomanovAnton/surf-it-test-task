export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export interface EpisodesState {
  results: Episode[];
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  } | null;
  currentPage: number;
  searchValue: string;
  isLoading: boolean;
  error: string;
}
