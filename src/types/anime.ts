export interface AnimeGenre {
  malId: number;
  name: string;
}

export interface AnimeTrailer {
  youtubeId: string;
  url: string;
  embedUrl: string;
  image: string;
}

export interface StreamingLink {
  name: string;
  url: string;
}

/** Normalised anime shape shared by the API and the React client. */
export interface Anime {
  malId: number;
  anilistId: number;
  idMal: number | null;
  title: string;
  titleDefault: string;
  titleJapanese: string;
  synopsis: string;
  background: string;
  type: string;
  formatKey: string;
  source: string;
  episodes: number | null;
  status: string;
  statusKey: string;
  airing: boolean;
  aired: string;
  year: number | null;
  season: string;
  duration: string;
  rating: string;
  score: number | null;
  scoredBy: number;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  genres: AnimeGenre[];
  themes: AnimeGenre[];
  demographics: AnimeGenre[];
  studios: string[];
  producers: string[];
  licensors: string[];
  image: string;
  imageSmall: string;
  backdrop: string;
  trailer: AnimeTrailer | null;
  streaming: StreamingLink[];
  externalUrl: string;
  cached?: boolean;
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface Pagination {
  page: number;
  lastPage: number;
  hasNextPage: boolean;
  items: number | null;
  limit: number;
}

export interface Episode {
  malId: number;
  number: number;
  title: string;
  titleJapanese: string;
  aired: string | null;
  filler: boolean;
  recap: boolean;
}

export interface Character {
  malId: number;
  name: string;
  image: string;
  role: string;
  voiceActor: string;
}

export interface Recommendation {
  malId: number;
  title: string;
  image: string;
}

export interface HomeData {
  hero: Anime[];
  trending: Anime[];
  latest: Anime[];
  topRated: Anime[];
  upcoming: Anime[];
  genres: (AnimeGenre & { count: number })[];
  source: 'live' | 'cached';
}
