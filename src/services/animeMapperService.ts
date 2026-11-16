import { mapGenre } from './anilistGenresService.js';
import type { AniListDate, AniListExternalLink, AniListMedia, AniListPageInfo, AniListTrailer } from '../types/anilist.js';
import type { Anime, AnimeTrailer, Pagination, StreamingLink } from '../types/anime.js';

/**
 * Maps a raw AniList `Media` object into the compact shape the frontend uses.
 * Keeping this in one place means the UI never needs to know AniList's schema.
 */

const FORMAT_LABELS: Record<string, string> = {
  TV: 'TV',
  TV_SHORT: 'TV Short',
  MOVIE: 'Movie',
  SPECIAL: 'Special',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: 'Music',
};

const STATUS_LABELS: Record<string, string> = {
  RELEASING: 'Currently Airing',
  FINISHED: 'Finished Airing',
  NOT_YET_RELEASED: 'Not yet aired',
  CANCELLED: 'Cancelled',
  HIATUS: 'On Hiatus',
};

const SOURCE_LABELS: Record<string, string> = {
  ORIGINAL: 'Original',
  MANGA: 'Manga',
  LIGHT_NOVEL: 'Light Novel',
  VISUAL_NOVEL: 'Visual Novel',
  VIDEO_GAME: 'Video Game',
  NOVEL: 'Novel',
  DOUJINSHI: 'Doujinshi',
  ANIME: 'Anime',
  WEB_NOVEL: 'Web Novel',
  LIVE_ACTION: 'Live Action',
  GAME: 'Game',
  COMIC: 'Comic',
  MULTIMEDIA_PROJECT: 'Multimedia Project',
  PICTURE_BOOK: 'Picture Book',
  OTHER: 'Other',
};

const HTML_ENTITIES: Record<string, string> = {
  '&quot;': '"',
  '&#039;': "'",
  '&apos;': "'",
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
  '&nbsp;': ' ',
};

export function stripHtml(value: string | null | undefined = ''): string {
  return String(value)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, (entity) => HTML_ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function formatDate(date: AniListDate | null | undefined): string {
  if (!date?.year) return '';
  const month = date.month ? String(date.month).padStart(2, '0') : null;
  const day = date.day ? String(date.day).padStart(2, '0') : null;
  return [date.year, month, day].filter(Boolean).join('-');
}

function formatAired(media: AniListMedia): string {
  const start = formatDate(media.startDate);
  const end = formatDate(media.endDate);
  if (!start) return '';
  if (!end || end === start) return start;
  return `${start} to ${end}`;
}

function formatDuration(minutes: number | null | undefined, format: string): string {
  if (!minutes) return '';
  if (format === 'MOVIE' || minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return [hours ? `${hours} hr` : '', rest ? `${rest} min` : ''].filter(Boolean).join(' ');
  }
  return `${minutes} min per ep`;
}

function mapExternalLinks(links: AniListExternalLink[] = []): StreamingLink[] {
  const seen = new Set<string>();
  return links
    .filter((link) => link?.type === 'STREAMING' && link.site?.toLowerCase() !== 'youtube')
    .filter((link) => {
      const name = link.site || '';
      if (!name || seen.has(name) || !link.url) return false;
      seen.add(name);
      return true;
    })
    .map((link) => ({ name: link.site as string, url: link.url as string }));
}

function mapTrailer(trailer: AniListTrailer | null | undefined): AnimeTrailer | null {
  if (!trailer || trailer.site?.toLowerCase() !== 'youtube') return null;
  const youtubeId = String(trailer.id || '').trim();
  if (!youtubeId) return null;

  return {
    youtubeId,
    url: `https://www.youtube.com/watch?v=${youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    image: trailer.thumbnail || '',
  };
}

export function mapAnime(media: AniListMedia): Anime {
  const cover = media.coverImage || {};
  const title = media.title || {};
  const format = media.format || '';
  const status = media.status || '';

  const image = cover.extraLarge || cover.large || cover.medium || '';
  const nextEpisode = media.nextAiringEpisode?.episode;
  const episodes =
    media.episodes ??
    (format === 'MOVIE' ? 1 : nextEpisode ? Math.max(1, nextEpisode - 1) : null);

  const statusKey =
    status === 'RELEASING'
      ? 'airing'
      : status === 'FINISHED'
        ? 'complete'
        : status === 'NOT_YET_RELEASED'
          ? 'upcoming'
          : status === 'HIATUS'
            ? 'hiatus'
            : '';

  return {
    // Kept as `malId` so existing routes, watchlist/history records and UI
    // components keep working; the value is now the AniList media id.
    malId: media.id,
    anilistId: media.id,
    idMal: media.idMal ?? null,
    title: title.english || title.romaji || title.native || 'Untitled',
    titleDefault: title.romaji || '',
    titleJapanese: title.native || '',
    synopsis: stripHtml(media.description || ''),
    background: '',
    type: FORMAT_LABELS[format] || format || '',
    formatKey: format ? format.toLowerCase() : '',
    source: SOURCE_LABELS[media.source ?? ''] || media.source || '',
    episodes,
    status: STATUS_LABELS[status] || status || '',
    statusKey,
    airing: status === 'RELEASING',
    aired: formatAired(media),
    year: media.seasonYear || media.startDate?.year || null,
    season: String(media.season || '').toLowerCase(),
    duration: formatDuration(media.duration, format),
    rating: media.isAdult ? '18+' : '',
    score: media.averageScore ? Math.round(media.averageScore) / 10 : null,
    scoredBy: 0,
    rank: null,
    popularity: media.popularity ?? 0,
    members: media.popularity ?? 0,
    favorites: media.favourites ?? 0,
    genres: (media.genres || []).map(mapGenre),
    themes: [],
    demographics: [],
    studios: (media.studios?.nodes || [])
      .map((studio) => studio.name)
      .filter((name): name is string => Boolean(name)),
    producers: [],
    licensors: [],
    image,
    imageSmall: cover.large || cover.medium || image,
    backdrop: media.bannerImage || '',
    trailer: mapTrailer(media.trailer),
    streaming: mapExternalLinks(media.externalLinks ?? []),
    externalUrl: media.siteUrl || '',
    ...(media.__cached ? { cached: true } : {}),
  };
}

/** Maps an AniList `Page.media` array. */
export const mapAnimeList = (
  list: Array<AniListMedia | null | undefined> = []
): Anime[] =>
  list.filter((item): item is AniListMedia => Boolean(item)).map(mapAnime);

export function mapPagination(
  pageInfo: AniListPageInfo | null | undefined = {},
  page = 1,
  limit = 24
): Pagination {
  const info = pageInfo ?? {};
  return {
    page: info.currentPage ?? page,
    lastPage: info.lastPage ?? 1,
    hasNextPage: Boolean(info.hasNextPage),
    items: info.total ?? null,
    limit: info.perPage ?? limit,
  };
}
