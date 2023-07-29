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
    count: number | null;
    pages: number | null;
    next: string;
    prev: string;
  };
  currentPage: number;
  searchValue: string;
  isLoading: boolean;
  error: string;
}
