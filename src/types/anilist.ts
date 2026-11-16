/** Minimal typed shape of the AniList GraphQL objects we consume. */

export interface AniListTitle {
  romaji?: string | null;
  english?: string | null;
  native?: string | null;
}

export interface AniListDate {
  year?: number | null;
  month?: number | null;
  day?: number | null;
}

export interface AniListCoverImage {
  extraLarge?: string | null;
  large?: string | null;
  medium?: string | null;
  color?: string | null;
}

export interface AniListTrailer {
  id?: string | null;
  site?: string | null;
  thumbnail?: string | null;
}

export interface AniListExternalLink {
  site?: string | null;
  url?: string | null;
  type?: string | null;
}

export interface AniListCharacterEdge {
  role?: string | null;
  voiceActors?: Array<{ name?: { full?: string | null } | null }> | null;
  node?: {
    id?: number | null;
    name?: { full?: string | null } | null;
    image?: { large?: string | null } | null;
  } | null;
}

export interface AniListRecommendationNode {
  mediaRecommendation?: {
    id: number;
    title?: AniListTitle | null;
    coverImage?: AniListCoverImage | null;
  } | null;
}

export interface AniListMedia {
  id: number;
  idMal?: number | null;
  title?: AniListTitle | null;
  description?: string | null;
  format?: string | null;
  status?: string | null;
  episodes?: number | null;
  duration?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  startDate?: AniListDate | null;
  endDate?: AniListDate | null;
  nextAiringEpisode?: { episode?: number | null; airingAt?: number | null } | null;
  averageScore?: number | null;
  meanScore?: number | null;
  popularity?: number | null;
  favourites?: number | null;
  genres?: string[] | null;
  source?: string | null;
  isAdult?: boolean | null;
  coverImage?: AniListCoverImage | null;
  bannerImage?: string | null;
  trailer?: AniListTrailer | null;
  siteUrl?: string | null;
  externalLinks?: AniListExternalLink[] | null;
  studios?: { nodes?: Array<{ name?: string | null }> | null } | null;
  characters?: { edges?: AniListCharacterEdge[] | null } | null;
  recommendations?: { nodes?: AniListRecommendationNode[] | null } | null;
  __cached?: boolean;
}

export interface AniListPageInfo {
  total?: number | null;
  currentPage?: number | null;
  lastPage?: number | null;
  hasNextPage?: boolean | null;
  perPage?: number | null;
}

export interface AniListPage {
  media?: AniListMedia[] | null;
  pageInfo?: AniListPageInfo | null;
}

export interface AniListHomePayload {
  trending?: AniListPage | null;
  currentSeason?: AniListPage | null;
  topRated?: AniListPage | null;
  upcoming?: AniListPage | null;
  genres?: string[] | null;
}

export interface AniListMediaPayload {
  Media?: AniListMedia | null;
}

export interface AniListGenresPayload {
  GenreCollection?: string[] | null;
}

export interface AniListPagePayload {
  Page?: AniListPage | null;
}

export interface AniListError {
  message: string;
}

export interface AniListResponse<T> {
  data?: T;
  errors?: AniListError[];
}
