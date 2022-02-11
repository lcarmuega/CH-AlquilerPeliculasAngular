export interface Role {
  character: string;
  characterId?: string;
}

export interface Principal {
  id: string;
  name: string;
  legacyNameText: string;
  billing?: number;
  category: string;
  characters: string[];
  roles: Role[];
  as?: string;
  disambiguation?: any;
  startYear?: number;
  endYear?: number;
  episodeCount?: number;
}

export interface MovieImage {
  height: number;
  width: number;
  id: string;
  url: string;
}

export interface MovieOld {
  id: string;
  image: MovieImage;
  runningTimeInMinutes: number;
  title: string;
  titleType: string;
  year: number;
  principals: Principal[];
  nextEpisode?: string;
  numberOfEpisodes?: number;
  seriesEndYear?: number;
  seriesStartYear?: number;
  akas?: any[];
  legacyNameText?: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  genre_ids: number[],
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movies {
page: number;
results: Movie[];
total_pages: number;
total_results: number;
}
