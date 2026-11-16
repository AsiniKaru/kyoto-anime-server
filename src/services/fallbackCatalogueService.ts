/**
 * Cached catalogue (auto-generated from AniList).
 *
 * Used only when a live AniList request fails. Titles and images are real
 * anime entries, so the UI keeps showing the same kind of artwork instead of
 * random placeholder posters. Regenerate with `node scripts/build-fallback.mjs`.
 */
import { ANILIST_GENRES, mapGenre } from './anilistGenresService.js';
import type { Anime, HomeData, Pagination } from '../types/anime.js';

export const fallbackAnime: Anime[] = [
  {
    "malId": 212888,
    "anilistId": 212888,
    "idMal": 64340,
    "title": "Overgeared",
    "titleDefault": "Tempal: Item no Chikara",
    "titleJapanese": "テムパル～アイテムの力～",
    "synopsis": "Sin Yeong-U (a.k.a. Grid), an unlucky man in life and a low-level player in the popular VR game “Satisfy,” finds a powerful item that earns him a rare legendary class title: “Pagma’s Successor.” He’s now a skilled blacksmith who can forge unique weapons and equip the game’s most powerful gear. Grid resolves to use his new abilities to achieve fame and fortune, but as his very existence begins to stir up trouble in Satisfy, he realizes that life as a legend may be more than he bargained for….\n\n(Source: Tapas, edited)\n\nNote: Tempal: Item no Chikara is streaming a week in advance of the TV broadcast on Prime Video and Crunchyroll beginning September 27th, 2026. Regular broadcasting began on October 2nd, 2026.",
    "background": "",
    "type": "ONA",
    "formatKey": "ona",
    "source": "Manga",
    "episodes": 12,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-09-27",
    "year": 2026,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 7.6,
    "scoredBy": 0,
    "rank": null,
    "popularity": 63691,
    "members": 63691,
    "favorites": 1358,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "J.C.STAFF"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx212888-NhyvqPt5aIuJ.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx212888-NhyvqPt5aIuJ.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/212888-ZsnNegBCKXQq.jpg",
    "trailer": {
      "youtubeId": "e1Km0FqUZl0",
      "url": "https://www.youtube.com/watch?v=e1Km0FqUZl0",
      "embedUrl": "https://www.youtube.com/embed/e1Km0FqUZl0",
      "image": "https://i.ytimg.com/vi/e1Km0FqUZl0/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GT00384004"
      }
    ],
    "externalUrl": "https://anilist.co/anime/212888",
    "cached": true
  },
  {
    "malId": 21,
    "anilistId": 21,
    "idMal": 21,
    "title": "ONE PIECE",
    "titleDefault": "ONE PIECE",
    "titleJapanese": "ONE PIECE",
    "synopsis": "Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.\n\nEnter Monkey D. Luffy, a 17-year-old boy that defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece, are his reasons of becoming a pirate. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.\n\n*This includes the following special episodes:\n\n- Chopperman to the Rescue! Protect the TV Station by the Shore! (Episode 336)\n\n- The Strongest Tag-Team! Luffy and Toriko's Hard Struggle! (Episode 492)\n\n- Team Formation! Save Chopper (Episode 542)\n\n- History's Strongest Collaboration vs. Glutton of the Sea (Episode 590)\n\n- 20th Anniversary! Special Romance Dawn (Episode 907)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 1180,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "1999-10-20",
    "year": 1999,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.7,
    "scoredBy": 0,
    "rank": null,
    "popularity": 770120,
    "members": 770120,
    "favorites": 110938,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Toei Animation"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-ELSYx3yMPcKM.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    "trailer": null,
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "http://www.crunchyroll.com/one-piece"
      },
      {
        "name": "Hulu",
        "url": "http://www.hulu.com/one-piece"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/80107103"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/media/37976"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/1bk9icvr331"
      },
      {
        "name": "WeTV",
        "url": "https://wetv.vip/en/play/tnfk3rniubz3m8o"
      },
      {
        "name": "Hoopla",
        "url": "https://www.hoopladigital.com/series/one-piece/14153295320"
      }
    ],
    "externalUrl": "https://anilist.co/anime/21",
    "cached": true
  },
  {
    "malId": 186541,
    "anilistId": 186541,
    "idMal": 60948,
    "title": "Reborn as a Space Mercenary: I Woke Up Piloting the Strongest Starship!",
    "titleDefault": "Mezametara Saikyou Soubi to Uchuusen-mochi datta node, Ikkodate Mezashite Youhei to shite Jiyuu ni Ikitai",
    "titleJapanese": "目覚めたら最強装備と宇宙船持ちだったので、一戸建て目指して傭兵として自由に生きたい",
    "synopsis": "Sato Takahiro was an ordinary office worker and hobbyist gamer until the day he woke up on a spaceship–one that strangely resembled a craft from a favorite space-shooter game. With a decked-out ship, a crew full of babes, and a fantastic universe to explore, he's going to make the most of his good luck and create the life he's always dreamed of!\n\n(Source: Seven Seas Entertainment)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Light Novel",
    "episodes": 13,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-10-04",
    "year": 2026,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 6.9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 30855,
    "members": 30855,
    "favorites": 426,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 9,
        "name": "Mecha"
      },
      {
        "malId": 13,
        "name": "Romance"
      },
      {
        "malId": 14,
        "name": "Sci-Fi"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "studio A-CAT"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx186541-caYpLsLmbCh7.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx186541-caYpLsLmbCh7.jpg",
    "backdrop": "",
    "trailer": {
      "youtubeId": "Z9ofT53sz2U",
      "url": "https://www.youtube.com/watch?v=Z9ofT53sz2U",
      "embedUrl": "https://www.youtube.com/embed/Z9ofT53sz2U",
      "image": "https://i.ytimg.com/vi/Z9ofT53sz2U/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GT00384006/reborn-as-a-space-mercenary-i-woke-up-piloting-the-strongest-starship"
      }
    ],
    "externalUrl": "https://anilist.co/anime/186541",
    "cached": true
  },
  {
    "malId": 205896,
    "anilistId": 205896,
    "idMal": 63292,
    "title": "Full Clearing Another World under a Goddess with Zero Believers",
    "titleDefault": "Shinja Zero no Megami-sama to Hajimeru Isekai Kouryaku",
    "titleJapanese": "信者ゼロの女神サマと始める異世界攻略",
    "synopsis": "RPG player Makoto Takatsuki is hurled into another world with awful skills and stats. But he soon meets a goddess named Noah, who asks him to become her 1st believer in return for blessings.\n\n(Source: J-Novel Club)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Light Novel",
    "episodes": 6,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-10-11",
    "year": 2026,
    "season": "fall",
    "duration": "",
    "rating": "",
    "score": 6.5,
    "scoredBy": 0,
    "rank": null,
    "popularity": 23539,
    "members": 23539,
    "favorites": 223,
    "genres": [
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "HORNETS"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx205896-ElrV8oVAsuax.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx205896-ElrV8oVAsuax.jpg",
    "backdrop": "",
    "trailer": {
      "youtubeId": "qlMB8vSpLzc",
      "url": "https://www.youtube.com/watch?v=qlMB8vSpLzc",
      "embedUrl": "https://www.youtube.com/embed/qlMB8vSpLzc",
      "image": "https://i.ytimg.com/vi/qlMB8vSpLzc/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GT00383992/full-clearing-another-world-under-a-goddess-with-zero-believers"
      }
    ],
    "externalUrl": "https://anilist.co/anime/205896",
    "cached": true
  },
  {
    "malId": 195604,
    "anilistId": 195604,
    "idMal": 61967,
    "title": "Black Clover Season 2",
    "titleDefault": "Black Clover 2nd Season",
    "titleJapanese": "ブラッククローバー 第2期",
    "synopsis": "As tyranny engulfs the Clover Kingdom, Asta and the Magic Knights launch a desperate raid on the Spade Kingdom to rescue their squad captains from the Dark Triad. But their mission leads them into a brutal battle against forces beyond anything they’ve ever faced. Now, Asta must rise above impossible odds to protect his friends and honor the promise he made to Yuno.\n\n(Source: Crunchyroll)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 7,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-10-03",
    "year": 2026,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.8,
    "scoredBy": 0,
    "rank": null,
    "popularity": 110082,
    "members": 110082,
    "favorites": 3830,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Studio Pierrot"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx195604-tSZcfKbVqSEG.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx195604-tSZcfKbVqSEG.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/195604-lQpCzTziSA17.jpg",
    "trailer": {
      "youtubeId": "4MYo8FfiXMA",
      "url": "https://www.youtube.com/watch?v=4MYo8FfiXMA",
      "embedUrl": "https://www.youtube.com/embed/4MYo8FfiXMA",
      "image": "https://i.ytimg.com/vi/4MYo8FfiXMA/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GRE50KV36/black-clover"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/en/media/2432940"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/qchxviq611"
      }
    ],
    "externalUrl": "https://anilist.co/anime/195604",
    "cached": true
  },
  {
    "malId": 206814,
    "anilistId": 206814,
    "idMal": 63367,
    "title": "Dragon Ball Super: Beerus",
    "titleDefault": "Dragon Ball Super: Beerus",
    "titleJapanese": "ドラゴンボール超 ビルス",
    "synopsis": "Several years have passed since the fierce battle against Majin Buu, and Earth has finally regained a brief moment of peace. At the same time, Beerus, the God of Destruction, awakens from his long, deep sleep.\n\nEven Kai and Supreme Kai, aware of Beerus's overwhelming power to destroy entire planets, watch his awakening with great fear… Meanwhile, Beerus hears rumors of a Saiyan who defeated Frieza—and suddenly appears before Goku.\n\nTargeted by Beerus, the strongest being in the universe, Earth is in grave danger. Thus begins an earth-shattering cosmic battle between the God of Destruction and Goku and his alliesa—a conflict that will shake the entire universe.\n\n(Source: Official Site)\n\nNote: “Enhanced” edition of Dragon Ball Super, featuring a large volume of newly added and redrawn cuts, a reconstructed narrative, and updated visuals for a more immersive and faithful representation of Akira Toriyama’s original manga.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Other",
    "episodes": 6,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-10-11",
    "year": 2026,
    "season": "fall",
    "duration": "23 min per ep",
    "rating": "",
    "score": 8,
    "scoredBy": 0,
    "rank": null,
    "popularity": 31855,
    "members": 31855,
    "favorites": 832,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 14,
        "name": "Sci-Fi"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Toei Animation"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx206814-PVVzRbf1IQpe.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx206814-PVVzRbf1IQpe.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/206814-ARuwrZJAGONN.jpg",
    "trailer": {
      "youtubeId": "CFgEL7ei8VE",
      "url": "https://www.youtube.com/watch?v=CFgEL7ei8VE",
      "embedUrl": "https://www.youtube.com/embed/CFgEL7ei8VE",
      "image": "https://i.ytimg.com/vi/CFgEL7ei8VE/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/83189604"
      },
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GT00389311/dragon-ball-super-beerus"
      }
    ],
    "externalUrl": "https://anilist.co/anime/206814",
    "cached": true
  },
  {
    "malId": 189123,
    "anilistId": 189123,
    "idMal": 61323,
    "title": "Blue Box Season 2",
    "titleDefault": "Ao no Hako Season 2",
    "titleJapanese": "アオのハコ Season２",
    "synopsis": "The second season of Ao no Hako.\n\nAs Taiki and Chinatsu navigate their evolving feelings, a fractured friendship from the past and fierce competition cloud the road to nationals.\n\n(Source: Netflix, edited)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 12,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-10-04",
    "year": 2026,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.1,
    "scoredBy": 0,
    "rank": null,
    "popularity": 53452,
    "members": 53452,
    "favorites": 963,
    "genres": [
      {
        "malId": 13,
        "name": "Romance"
      },
      {
        "malId": 15,
        "name": "Slice of Life"
      },
      {
        "malId": 16,
        "name": "Sports"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Electric Circus"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx189123-0secXELIhkIW.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx189123-0secXELIhkIW.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/189123-aGJ7pIDUo2Xs.jpg",
    "trailer": {
      "youtubeId": "hJ6Y8PAOUk8",
      "url": "https://www.youtube.com/watch?v=hJ6Y8PAOUk8",
      "embedUrl": "https://www.youtube.com/embed/hJ6Y8PAOUk8",
      "image": "https://i.ytimg.com/vi/hJ6Y8PAOUk8/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/81663323"
      }
    ],
    "externalUrl": "https://anilist.co/anime/189123",
    "cached": true
  },
  {
    "malId": 191656,
    "anilistId": 191656,
    "idMal": 61578,
    "title": "Even the Student Council Has Its Holes!",
    "titleDefault": "Seitokai ni mo Ana wa Aru!",
    "titleJapanese": "生徒会にも穴はある！",
    "synopsis": "This is Fujinasu Academy, a private high school with top-achieving students located on the outskirts of town.\n\nHigh School 1st-Year Ume Mizunoe has excellent grades in Japanese language class and has received multiple literary awards.\nHowever, his terrible grades in the sciences are affecting his ability to move up a grade. To avoid repeating a year, he becomes a member of the student council to improve his academic standing.\n\nHowever, in the student council, he meets the charismatic yet sullen student council president Kotobuki Hisako, and the scary yet kind and refined treasurer, Arisu Terui. Other members include a cheeky and cute boy, Tan Otori, and Komaro Michinoku, the admin who's like a small abandoned cat. This is the start of a slapstick, heartful, rom-com about a busy student council full of cute, mismatched, and quirky students!\n\n(Source: Even the Student Council Has Its Holes! Official Site)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 12,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-10-04 to 2026-12-20",
    "year": 2026,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 7.4,
    "scoredBy": 0,
    "rank": null,
    "popularity": 53543,
    "members": 53543,
    "favorites": 979,
    "genres": [
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 5,
        "name": "Ecchi"
      },
      {
        "malId": 15,
        "name": "Slice of Life"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Passione"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx191656-xFHtxM8SUTdU.png",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx191656-xFHtxM8SUTdU.png",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/191656-JQILdzh3FQxN.jpg",
    "trailer": {
      "youtubeId": "VTRVLnzhl90",
      "url": "https://www.youtube.com/watch?v=VTRVLnzhl90",
      "embedUrl": "https://www.youtube.com/embed/VTRVLnzhl90",
      "image": "https://i.ytimg.com/vi/VTRVLnzhl90/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "OceanVeil",
        "url": "https://oceanveil.net/anime_titles/542"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/en/media/2433041"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/28ki6pjn6a1"
      }
    ],
    "externalUrl": "https://anilist.co/anime/191656",
    "cached": true
  },
  {
    "malId": 185756,
    "anilistId": 185756,
    "idMal": 60601,
    "title": "As a Reincarnated Aristocrat, I'll Use My Appraisal Skill to Rise in the World Season 3",
    "titleDefault": "Tensei Kizoku, Kantei Skill de Nariagaru 3rd Season",
    "titleJapanese": "転生貴族、鑑定スキルで成り上がる 第3期",
    "synopsis": "The third season of Tensei Kizoku, Kantei Skill de Nariagaru.\n\nNote: On September 4, 2026, it was announced that GeyeG Pictures would take over the production from studio MOTHER while keeping the same staff.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Light Novel",
    "episodes": 8,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-09-27",
    "year": 2026,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 6.8,
    "scoredBy": 0,
    "rank": null,
    "popularity": 31107,
    "members": 31107,
    "favorites": 402,
    "genres": [
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "GeyeG Pictures"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx185756-xPCl0RyQ7fXD.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx185756-xPCl0RyQ7fXD.jpg",
    "backdrop": "",
    "trailer": {
      "youtubeId": "8_Lxr7vO9l0",
      "url": "https://www.youtube.com/watch?v=8_Lxr7vO9l0",
      "embedUrl": "https://www.youtube.com/embed/8_Lxr7vO9l0",
      "image": "https://i.ytimg.com/vi/8_Lxr7vO9l0/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GG5H5XQMD/as-a-reincarnated-aristocrat-ill-use-my-appraisal-skill-to-rise-in-the-world"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/onlibp0le1"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/en/media/2432255"
      }
    ],
    "externalUrl": "https://anilist.co/anime/185756",
    "cached": true
  },
  {
    "malId": 195516,
    "anilistId": 195516,
    "idMal": 61987,
    "title": "The Apothecary Diaries Season 3",
    "titleDefault": "Kusuriya no Hitorigoto 3rd Season",
    "titleJapanese": "薬屋のひとりごと 第3期",
    "synopsis": "In the aftermath of the Shi Clan’s rebellion, things have finally settled down, and Maomao has returned to her old life as a pharmacist in the pleasure district.\n\nOne day, triggered by a breakfast served at the Verdigris House, Maomao senses an anomaly and begins investigating its true nature.\n\nMeanwhile, Jinshi, who has revealed his true identity as the Imperial brother and begun to face his heavy responsibilities, is deeply troubled by the final message left by Loulan: a warning of an impending \"disaster that will strike the nation.\"\n\nTo make matters worse, rumors of a mysterious shrine maiden who deceives the people begin to spread, casting a dark shadow over the country of Li once again.\n\nFrom the depths of the inner court to the city streets, and across foreign borders—the world grows wider, and the stakes even higher for Maomao and Jinshi.\n\n(Source: Crunchyroll)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Light Novel",
    "episodes": 12,
    "status": "Currently Airing",
    "statusKey": "airing",
    "airing": true,
    "aired": "2026-10-02",
    "year": 2026,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.5,
    "scoredBy": 0,
    "rank": null,
    "popularity": 113761,
    "members": 113761,
    "favorites": 3047,
    "genres": [
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 11,
        "name": "Mystery"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "OLM"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx195516-MJpUZlOberqH.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx195516-MJpUZlOberqH.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/195516-B5M0cPaQbQXI.jpg",
    "trailer": {
      "youtubeId": "YvNvvUeCztE",
      "url": "https://www.youtube.com/watch?v=YvNvvUeCztE",
      "embedUrl": "https://www.youtube.com/embed/YvNvvUeCztE",
      "image": "https://i.ytimg.com/vi/YvNvvUeCztE/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/G3KHEVDJ7/the-apothecary-diaries"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/us/title/81712068"
      }
    ],
    "externalUrl": "https://anilist.co/anime/195516",
    "cached": true
  },
  {
    "malId": 16498,
    "anilistId": 16498,
    "idMal": 16498,
    "title": "Attack on Titan",
    "titleDefault": "Shingeki no Kyojin",
    "titleJapanese": "進撃の巨人",
    "synopsis": "Several hundred years ago, humans were nearly exterminated by titans. Titans are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source. A small percentage of humanity survived by walling themselves in a city protected by extremely high walls, even taller than the biggest of titans.\n\nFlash forward to the present and the city has not seen a titan in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something horrific as the city walls are destroyed by a colossal titan that appears out of thin air. As the smaller titans flood the city, the two kids watch in horror as their mother is eaten alive. Eren vows that he will murder every single titan and take revenge for all of mankind.\n\n(Source: MangaHelpers)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 25,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2013-04-07 to 2013-09-28",
    "year": 2013,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.5,
    "scoredBy": 0,
    "rank": null,
    "popularity": 1079355,
    "members": 1079355,
    "favorites": 80811,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      },
      {
        "malId": 11,
        "name": "Mystery"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "WIT STUDIO"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-buvcRTBx4NSm.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
    "trailer": {
      "youtubeId": "LHtdKWJdif4",
      "url": "https://www.youtube.com/watch?v=LHtdKWJdif4",
      "embedUrl": "https://www.youtube.com/embed/LHtdKWJdif4",
      "image": "https://i.ytimg.com/vi/LHtdKWJdif4\t/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "http://www.crunchyroll.com/attack-on-titan"
      },
      {
        "name": "Hulu",
        "url": "http://www.hulu.com/attack-on-titan"
      },
      {
        "name": "Adult Swim",
        "url": "https://www.adultswim.com/videos/attack-on-titan"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/xq12ps94l5"
      }
    ],
    "externalUrl": "https://anilist.co/anime/16498",
    "cached": true
  },
  {
    "malId": 101922,
    "anilistId": 101922,
    "idMal": 38000,
    "title": "Demon Slayer: Kimetsu no Yaiba",
    "titleDefault": "Kimetsu no Yaiba",
    "titleJapanese": "鬼滅の刃",
    "synopsis": "It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a “demon slayer” so that he can turn his sister back into a human, and kill the demon that massacred his family.\n\n(Source: Crunchyroll)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 26,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2019-04-06 to 2019-09-28",
    "year": 2019,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.2,
    "scoredBy": 0,
    "rank": null,
    "popularity": 1015329,
    "members": 1015329,
    "favorites": 55065,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "ufotable"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-WBsBl0ClmgYL.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg",
    "trailer": {
      "youtubeId": "6vMuWuWlW4I",
      "url": "https://www.youtube.com/watch?v=6vMuWuWlW4I",
      "embedUrl": "https://www.youtube.com/embed/6vMuWuWlW4I",
      "image": "https://i.ytimg.com/vi/6vMuWuWlW4I/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/demon-slayer-kimetsu-no-yaiba"
      },
      {
        "name": "Hulu",
        "url": "https://www.hulu.com/demon-slayer-kimetsu-no-yaiba"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/81091393"
      }
    ],
    "externalUrl": "https://anilist.co/anime/101922",
    "cached": true
  },
  {
    "malId": 113415,
    "anilistId": 113415,
    "idMal": 40748,
    "title": "JUJUTSU KAISEN",
    "titleDefault": "Jujutsu Kaisen",
    "titleJapanese": "呪術廻戦",
    "synopsis": "A boy fights... for \"the right death.\"\n\nHardship, regret, shame: the negative feelings that humans feel become Curses that lurk in our everyday lives. The Curses run rampant throughout the world, capable of leading people to terrible misfortune and even death. What's more, the Curses can only be exorcised by another Curse.\n\nItadori Yuji is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a friend who has been attacked by Curses, he eats the finger of the Double-Faced Specter, taking the Curse into his own soul. From then on, he shares one body with the Double-Faced Specter. Guided by the most powerful of sorcerers, Gojou Satoru, Itadori is admitted to the Tokyo Metropolitan Technical High School of Sorcery, an organization that fights the Curses... and thus begins the heroic tale of a boy who became a Curse to exorcise a Curse, a life from which he could never turn back.\n\n(Source: Crunchyroll)\n\nNote: The first episode received an early web premiere on September 19th, 2020. The regular TV broadcast started on October 3rd, 2020.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 24,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2020-10-03 to 2021-03-27",
    "year": 2020,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.4,
    "scoredBy": 0,
    "rank": null,
    "popularity": 997032,
    "members": 997032,
    "favorites": 64917,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "MAPPA"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-LHBAeoZDIsnF.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    "trailer": {
      "youtubeId": "RIyb52EMx8c",
      "url": "https://www.youtube.com/watch?v=RIyb52EMx8c",
      "embedUrl": "https://www.youtube.com/embed/RIyb52EMx8c",
      "image": "https://i.ytimg.com/vi/RIyb52EMx8c/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/jujutsu-kaisen"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/81278456"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/igc33vhvex"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/media/37738"
      },
      {
        "name": "Hulu",
        "url": "https://www.hulu.com/series/jujutsu-kaisen-382ec8bf-3650-4cde-94db-ecd18665f9e0"
      }
    ],
    "externalUrl": "https://anilist.co/anime/113415",
    "cached": true
  },
  {
    "malId": 1535,
    "anilistId": 1535,
    "idMal": 1535,
    "title": "Death Note",
    "titleDefault": "DEATH NOTE",
    "titleJapanese": "DEATH NOTE",
    "synopsis": "Light Yagami is a genius high school student who is about to learn about life through a book of death. When a bored shinigami, a God of Death, named Ryuk drops a black notepad called a Death Note, Light receives power over life and death with the stroke of a pen. Determined to use this dark gift for the best, Light sets out to rid the world of evil… namely, the people he believes to be evil. Should anyone hold such power?\n\nThe consequences of Light’s actions will set the world ablaze.\n\n(Source: VIZ Media)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 37,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2006-10-04 to 2007-06-27",
    "year": 2006,
    "season": "fall",
    "duration": "23 min per ep",
    "rating": "",
    "score": 8.4,
    "scoredBy": 0,
    "rank": null,
    "popularity": 983596,
    "members": 983596,
    "favorites": 63209,
    "genres": [
      {
        "malId": 11,
        "name": "Mystery"
      },
      {
        "malId": 12,
        "name": "Psychological"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      },
      {
        "malId": 18,
        "name": "Thriller"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "MADHOUSE"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-kUgkcrfOrkUM.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
    "trailer": {
      "youtubeId": "NlJZ-YgAt-c",
      "url": "https://www.youtube.com/watch?v=NlJZ-YgAt-c",
      "embedUrl": "https://www.youtube.com/embed/NlJZ-YgAt-c",
      "image": "https://i.ytimg.com/vi/NlJZ-YgAt-c/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Hulu",
        "url": "http://www.hulu.com/death-note"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/70204970"
      },
      {
        "name": "Tubi TV",
        "url": "https://tubitv.com/series/1630/death_note"
      },
      {
        "name": "Amazon Prime Video",
        "url": "https://www.amazon.com/Death-Note/dp/B0B6RMGK8Z"
      },
      {
        "name": "Hoopla",
        "url": "https://www.hoopladigital.com/television/death-note-subbed-season-1-mamoru-miyano/14733965"
      },
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/G6QWD3EE6"
      }
    ],
    "externalUrl": "https://anilist.co/anime/1535",
    "cached": true
  },
  {
    "malId": 21459,
    "anilistId": 21459,
    "idMal": 31964,
    "title": "My Hero Academia",
    "titleDefault": "Boku no Hero Academia",
    "titleJapanese": "僕のヒーローアカデミア",
    "synopsis": "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n\nMiddle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…\n\n(Source: VIZ Media)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 13,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2016-04-03 to 2016-06-26",
    "year": 2016,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 7.6,
    "scoredBy": 0,
    "rank": null,
    "popularity": 891019,
    "members": 891019,
    "favorites": 29803,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 3,
        "name": "Comedy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "bones"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-nYh85uj2Fuwr.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21459-nYh85uj2Fuwr.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21459-yeVkolGKdGUV.jpg",
    "trailer": {
      "youtubeId": "AhqVltWDqFA",
      "url": "https://www.youtube.com/watch?v=AhqVltWDqFA",
      "embedUrl": "https://www.youtube.com/embed/AhqVltWDqFA",
      "image": "https://i.ytimg.com/vi/AhqVltWDqFA/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Hulu",
        "url": "http://www.hulu.com/my-hero-academia"
      },
      {
        "name": "Crunchyroll",
        "url": "http://www.crunchyroll.com/my-hero-academia"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/80135674"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/1djwf83pp09"
      }
    ],
    "externalUrl": "https://anilist.co/anime/21459",
    "cached": true
  },
  {
    "malId": 11061,
    "anilistId": 11061,
    "idMal": 11061,
    "title": "Hunter x Hunter (2011)",
    "titleDefault": "HUNTER×HUNTER (2011)",
    "titleJapanese": "HUNTER×HUNTER (2011)",
    "synopsis": "A Hunter is one who travels the world doing all sorts of dangerous tasks. From capturing criminals to searching deep within uncharted lands for any lost treasures. Gon is a young boy whose father disappeared long ago, being a Hunter. He believes if he could also follow his father's path, he could one day reunite with him.\n\nAfter becoming 12, Gon leaves his home and takes on the task of entering the Hunter exam, notorious for its low success rate and high probability of death to become an official Hunter. He befriends the revenge-driven Kurapika, the doctor-to-be Leorio and the rebellious ex-assassin Killua in the exam, with their friendship prevailing throughout the many trials and threats they come upon taking on the dangerous career of a Hunter.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 148,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2011-10-02 to 2014-09-24",
    "year": 2011,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 858316,
    "members": 858316,
    "favorites": 91631,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "MADHOUSE"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-y5gsT1hoHuHw.png",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11061-y5gsT1hoHuHw.png",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-8WkkTZ6duKpq.jpg",
    "trailer": {
      "youtubeId": "d6kBeJjTGnY",
      "url": "https://www.youtube.com/watch?v=d6kBeJjTGnY",
      "embedUrl": "https://www.youtube.com/embed/d6kBeJjTGnY",
      "image": "https://i.ytimg.com/vi/d6kBeJjTGnY/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "http://www.crunchyroll.com/hunter-x-hunter"
      },
      {
        "name": "Hulu",
        "url": "https://www.hulu.com/hunter-x-hunter"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/70300472"
      },
      {
        "name": "Tubi TV",
        "url": "https://tubitv.com/series/1627/hunter_x_hunter"
      },
      {
        "name": "Bilibili",
        "url": "https://www.bilibili.tv/en/play/37603"
      },
      {
        "name": "Hoopla",
        "url": "https://www.hoopladigital.com/series/hunter-x-hunter-dubbed/11834349593"
      },
      {
        "name": "Amazon Prime Video",
        "url": "https://www.amazon.com/Hunter-Japanese-English-Subs/dp/B0B5X87G1P"
      }
    ],
    "externalUrl": "https://anilist.co/anime/11061",
    "cached": true
  },
  {
    "malId": 21087,
    "anilistId": 21087,
    "idMal": 30276,
    "title": "One-Punch Man",
    "titleDefault": "One Punch Man",
    "titleJapanese": "ワンパンマン",
    "synopsis": "Saitama has a rather peculiar hobby, being a superhero, but despite his heroic deeds and superhuman abilities, a shadow looms over his life. He's become much too powerful, to the point that every opponent ends up defeated with a single punch.\n\nThe lack of challenge has driven him into a state of apathy, as he watches his life pass by having lost all enthusiasm, at least until he's unwillingly thrust in the role of being a mentor to the young and revenge-driven Genos.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 12,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2015-10-05 to 2015-12-21",
    "year": 2015,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.2,
    "scoredBy": 0,
    "rank": null,
    "popularity": 780912,
    "members": 780912,
    "favorites": 30932,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 14,
        "name": "Sci-Fi"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "MADHOUSE"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21087-B5DHjqZ3kW4b.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21087-B5DHjqZ3kW4b.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21087-sHb9zUZFsHe1.jpg",
    "trailer": {
      "youtubeId": "RzmFKUDOUgw",
      "url": "https://www.youtube.com/watch?v=RzmFKUDOUgw",
      "embedUrl": "https://www.youtube.com/embed/RzmFKUDOUgw",
      "image": "https://i.ytimg.com/vi/RzmFKUDOUgw/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Hulu",
        "url": "http://www.hulu.com/onepunch-man"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/80117291"
      },
      {
        "name": "WeTV",
        "url": "https://wetv.vip/id/play/r386s7hzwidwkpv/r0035owmbkx"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/2ekpp4jtbwt"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/media/36279"
      },
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/G63K98PZ6/one-punch-man"
      }
    ],
    "externalUrl": "https://anilist.co/anime/21087",
    "cached": true
  },
  {
    "malId": 20605,
    "anilistId": 20605,
    "idMal": 22319,
    "title": "Tokyo Ghoul",
    "titleDefault": "Tokyo Ghoul",
    "titleJapanese": "東京喰種 トーキョーグール",
    "synopsis": "The suspense horror/dark fantasy story is set in Tokyo, which is haunted by mysterious \"ghouls\" who are devouring humans. People are gripped by the fear of these ghouls whose identities are masked in mystery. An ordinary college student named Kaneki encounters Rize, a girl who is an avid reader like him, at the café he frequents. Little does he realize that his fate will change overnight.\n\n(Source: Anime News Network)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 12,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2014-07-04 to 2014-09-19",
    "year": 2014,
    "season": "summer",
    "duration": "24 min per ep",
    "rating": "",
    "score": 7.6,
    "scoredBy": 0,
    "rank": null,
    "popularity": 755212,
    "members": 755212,
    "favorites": 25352,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 7,
        "name": "Horror"
      },
      {
        "malId": 11,
        "name": "Mystery"
      },
      {
        "malId": 12,
        "name": "Psychological"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Studio Pierrot"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b20605-k665mVkSug8D.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b20605-k665mVkSug8D.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20605-RCJ7M71zLmrh.jpg",
    "trailer": {
      "youtubeId": "XfQUjYsVBrE",
      "url": "https://www.youtube.com/watch?v=XfQUjYsVBrE",
      "embedUrl": "https://www.youtube.com/embed/XfQUjYsVBrE",
      "image": "https://i.ytimg.com/vi/XfQUjYsVBrE/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Hulu",
        "url": "http://www.hulu.com/tokyo-ghoul"
      },
      {
        "name": "Amazon Prime Video",
        "url": "https://www.amazon.com/gp/video/detail/B015O6OK4G/"
      },
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/en-gb/tokyo-ghoul"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/80023687"
      }
    ],
    "externalUrl": "https://anilist.co/anime/20605",
    "cached": true
  },
  {
    "malId": 20958,
    "anilistId": 20958,
    "idMal": 25777,
    "title": "Attack on Titan Season 2",
    "titleDefault": "Shingeki no Kyojin Season 2",
    "titleJapanese": "進撃の巨人 Season２",
    "synopsis": "Eren Jaeger swore to wipe out every last Titan, but in a battle for his life he wound up becoming the thing he hates most. With his new powers, he fights for humanity's freedom facing the monsters that threaten his home. After a bittersweet victory against the Female Titan, Eren finds no time to rest—a horde of Titans is approaching Wall Rose and the battle for humanity continues!\n\n(Source: Funimation)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 12,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2017-04-01 to 2017-06-17",
    "year": 2017,
    "season": "spring",
    "duration": "25 min per ep",
    "rating": "",
    "score": 8.5,
    "scoredBy": 0,
    "rank": null,
    "popularity": 749154,
    "members": 749154,
    "favorites": 20283,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      },
      {
        "malId": 11,
        "name": "Mystery"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "WIT STUDIO"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20958-HuFJyr54Mmir.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20958-HuFJyr54Mmir.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20958-Y7eQdz9VENBD.jpg",
    "trailer": {
      "youtubeId": "zLaVP8IhIuc",
      "url": "https://www.youtube.com/watch?v=zLaVP8IhIuc",
      "embedUrl": "https://www.youtube.com/embed/zLaVP8IhIuc",
      "image": "https://i.ytimg.com/vi/zLaVP8IhIuc/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "http://www.crunchyroll.com/attack-on-titan"
      },
      {
        "name": "Hulu",
        "url": "https://www.hulu.com/attack-on-titan"
      },
      {
        "name": "Adult Swim",
        "url": "https://www.adultswim.com/videos/attack-on-titan"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/1f7yemxzyr5"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/70299043"
      }
    ],
    "externalUrl": "https://anilist.co/anime/20958",
    "cached": true
  },
  {
    "malId": 154587,
    "anilistId": 154587,
    "idMal": 52991,
    "title": "Frieren: Beyond Journey’s End",
    "titleDefault": "Sousou no Frieren",
    "titleJapanese": "葬送のフリーレン",
    "synopsis": "The adventure is over but life goes on for an elf mage just beginning to learn what living is all about. Elf mage Frieren and her courageous fellow adventurers have defeated the Demon King and brought peace to the land. But Frieren will long outlive the rest of her former party. How will she come to understand what life means to the people around her? Decades after their victory, the funeral of one her friends confronts Frieren with her own near immortality. Frieren sets out to fulfill the last wishes of her comrades and finds herself beginning a new adventure…\n\n(Source: Crunchyroll)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 28,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2023-09-29 to 2024-03-22",
    "year": 2023,
    "season": "fall",
    "duration": "24 min per ep",
    "rating": "",
    "score": 9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 499391,
    "members": 499391,
    "favorites": 57175,
    "genres": [
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "MADHOUSE"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx154587-qQTzQnEJJ3oB.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg",
    "trailer": {
      "youtubeId": "tR8YH0G67Rk",
      "url": "https://www.youtube.com/watch?v=tR8YH0G67Rk",
      "embedUrl": "https://www.youtube.com/embed/tR8YH0G67Rk",
      "image": "https://i.ytimg.com/vi/tR8YH0G67Rk/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GG5H5XQX4/frieren-beyond-journeys-end"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/en/media/2090295"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/81726714"
      },
      {
        "name": "Hulu",
        "url": "https://www.hulu.com/series/frieren-beyond-journeys-end-1d4725f8-06d1-43fb-a077-72143ac5502f"
      },
      {
        "name": "Amazon Prime Video",
        "url": "https://www.primevideo.com/detail/0FCJEHY4FXTDVCLZ5NR9A0N42N"
      }
    ],
    "externalUrl": "https://anilist.co/anime/154587",
    "cached": true
  },
  {
    "malId": 114129,
    "anilistId": 114129,
    "idMal": 39486,
    "title": "Gintama: THE VERY FINAL",
    "titleDefault": "Gintama: THE FINAL",
    "titleJapanese": "銀魂 THE FINAL",
    "synopsis": "Two years have passed following the Tendoshuu's invasion of the O-Edo Central Terminal. Since then, the Yorozuya have gone their separate ways. Foreseeing Utsuro's return, Gintoki Sakata begins surveying Earth's ley lines for traces of the other man's Altana. After an encounter with the remnants of the Tendoshuu—who continue to press on in search of immortality—Gintoki returns to Edo.\n\nLater, the regrouped Shinsengumi and Yorozuya begin an attack on the occupied Central Terminal. With the Altana harvested by the wreckage of the Tendoshuu's ship in danger of detonating, the Yorozuya and their allies fight their enemies while the safety of Edo—and the rest of the world—hangs in the balance. Fulfilling the wishes of their teacher, Shouyou Yoshida's former students unite and relive their pasts one final time in an attempt to save their futures.",
    "background": "",
    "type": "Movie",
    "formatKey": "movie",
    "source": "Manga",
    "episodes": 1,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2021-01-08",
    "year": 2021,
    "season": "winter",
    "duration": "1 hr 44 min",
    "rating": "",
    "score": 9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 56942,
    "members": 56942,
    "favorites": 3342,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 14,
        "name": "Sci-Fi"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Bandai Namco Pictures"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx114129-RLgSuh6YbeYx.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx114129-RLgSuh6YbeYx.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/114129-ZsLDkdwaYeJY.jpg",
    "trailer": {
      "youtubeId": "SvRHM7AONB4",
      "url": "https://www.youtube.com/watch?v=SvRHM7AONB4",
      "embedUrl": "https://www.youtube.com/embed/SvRHM7AONB4",
      "image": "https://i.ytimg.com/vi/SvRHM7AONB4/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/en/media/1042418/"
      },
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/gintama-the-very-final"
      }
    ],
    "externalUrl": "https://anilist.co/anime/114129",
    "cached": true
  },
  {
    "malId": 20996,
    "anilistId": 20996,
    "idMal": 28977,
    "title": "Gintama Season 3",
    "titleDefault": "Gintama°",
    "titleJapanese": "銀魂゜",
    "synopsis": "Gintoki, Shinpachi, and Kagura return as the fun-loving but broke members of the Yorozuya team! Living in an alternate-reality Edo, where swords are prohibited and alien overlords have conquered Japan, they try to thrive on doing whatever work they can get their hands on. However, Shinpachi and Kagura still haven't been paid... Does Gin-chan really spend all that cash playing pachinko?\n\nMeanwhile, when Gintoki drunkenly staggers home one night, an alien spaceship crashes nearby. A fatally injured crew member emerges from the ship and gives Gintoki a strange, clock-shaped device, warning him that it is incredibly powerful and must be safeguarded. Mistaking it for his alarm clock, Gintoki proceeds to smash the device the next morning and suddenly discovers that the world outside his apartment has come to a standstill. With Kagura and Shinpachi at his side, he sets off to get the device fixed; though, as usual, nothing is ever that simple for the Yorozuya team.\n\nFilled with tongue-in-cheek humor and moments of heartfelt emotion, Gintama's fourth season finds Gintoki and his friends facing both their most hilarious misadventures and most dangerous crises yet.\n\n(Source: MAL Rewrite)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 51,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2015-04-08 to 2016-03-30",
    "year": 2015,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 121412,
    "members": 121412,
    "favorites": 6336,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 14,
        "name": "Sci-Fi"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Bandai Namco Pictures"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20996-kBEGEGdeK1r7.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20996-kBEGEGdeK1r7.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20996-gaNJKtjmy3Pf.jpg",
    "trailer": {
      "youtubeId": "yTh0f4PGL_8",
      "url": "https://www.youtube.com/watch?v=yTh0f4PGL_8",
      "embedUrl": "https://www.youtube.com/embed/yTh0f4PGL_8",
      "image": "https://i.ytimg.com/vi/yTh0f4PGL_8/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "http://www.crunchyroll.com/gintama"
      }
    ],
    "externalUrl": "https://anilist.co/anime/20996",
    "cached": true
  },
  {
    "malId": 171627,
    "anilistId": 171627,
    "idMal": 57555,
    "title": "Chainsaw Man – The Movie: Reze Arc",
    "titleDefault": "Chainsaw Man: Reze-hen",
    "titleJapanese": "チェンソーマン レゼ篇",
    "synopsis": "Denji became “Chainsaw Man”, a boy with a devil’s heart, and is now part of Special Division 4’s devil hunters. After a date with Makima, the woman of his dreams, Denji takes shelter from the rain. There he meets Reze, a girl who works in a café.\n\n(Source: MAPPA CHANNEL)",
    "background": "",
    "type": "Movie",
    "formatKey": "movie",
    "source": "Manga",
    "episodes": 1,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2025-09-19",
    "year": 2025,
    "season": "summer",
    "duration": "1 hr 40 min",
    "rating": "",
    "score": 9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 254169,
    "members": 254169,
    "favorites": 19533,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 7,
        "name": "Horror"
      },
      {
        "malId": 13,
        "name": "Romance"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "MAPPA"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171627-ZN9D7P46yHnw.png",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx171627-ZN9D7P46yHnw.png",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/171627-7esVHhgw69rn.jpg",
    "trailer": {
      "youtubeId": "pv8A7eubPQQ",
      "url": "https://www.youtube.com/watch?v=pv8A7eubPQQ",
      "embedUrl": "https://www.youtube.com/embed/pv8A7eubPQQ",
      "image": "https://i.ytimg.com/vi/pv8A7eubPQQ/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GNVHKN92K/chainsaw-man--the-movie-reze-arc"
      }
    ],
    "externalUrl": "https://anilist.co/anime/171627",
    "cached": true
  },
  {
    "malId": 189046,
    "anilistId": 189046,
    "idMal": 61316,
    "title": "Re:ZERO -Starting Life in Another World- Season 4",
    "titleDefault": "Re:Zero kara Hajimeru Isekai Seikatsu 4th Season",
    "titleJapanese": "Re:ゼロから始める異世界生活 4th season",
    "synopsis": "In the deadly battle at Priestella, Subaru and his allies emerged victorious, but at great cost. As Subaru searches for a way to save Rem, Crusch, and Julius, he learns of a \"wise woman,\" Shaula, an all-seeing being said to possess every form of knowledge, who resides at the Pleiades Watchtower. Subaru and his crew must brave the uncharted Auguria Dunes to reclaim what was lost.\n\n(Source: Crunchyroll)\n\nNote: Lucca Comics & Games pre-screened episode 1 early on November 1, 2025, prior to the Japanese television broadcast on July 8th, 2026.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Light Novel",
    "episodes": 19,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2026-04-08 to 2026-09-30",
    "year": 2026,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 157662,
    "members": 157662,
    "favorites": 9979,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      },
      {
        "malId": 12,
        "name": "Psychological"
      },
      {
        "malId": 13,
        "name": "Romance"
      },
      {
        "malId": 18,
        "name": "Thriller"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "WHITE FOX"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx189046-yaHWtS5FII46.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx189046-yaHWtS5FII46.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/189046-MDk2CaVuRWpb.jpg",
    "trailer": {
      "youtubeId": "i8EjBP85cCc",
      "url": "https://www.youtube.com/watch?v=i8EjBP85cCc",
      "embedUrl": "https://www.youtube.com/embed/i8EjBP85cCc",
      "image": "https://i.ytimg.com/vi/i8EjBP85cCc/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/series/GRGG9798R"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/re-zero-starting-life-in-another-world-season-4-2026-201wmt3pwgh"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/en/media/2342439"
      }
    ],
    "externalUrl": "https://anilist.co/anime/189046",
    "cached": true
  },
  {
    "malId": 5114,
    "anilistId": 5114,
    "idMal": 5114,
    "title": "Fullmetal Alchemist: Brotherhood",
    "titleDefault": "Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST",
    "titleJapanese": "鋼の錬金術師 FULLMETAL ALCHEMIST",
    "synopsis": "\"In order for something to be obtained, something of equal value must be lost.\"\n\nAlchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called \"automail\" and become a state alchemist, the Fullmetal Alchemist.\n\nThree years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.\n\n(Source: MAL Rewrite)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 64,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2009-04-05 to 2010-07-04",
    "year": 2009,
    "season": "spring",
    "duration": "25 min per ep",
    "rating": "",
    "score": 9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 744686,
    "members": 744686,
    "favorites": 69544,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "bones"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-nSWCgQlmOMtj.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5114-nSWCgQlmOMtj.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
    "trailer": {
      "youtubeId": "1ac3_YdSSy0",
      "url": "https://www.youtube.com/watch?v=1ac3_YdSSy0",
      "embedUrl": "https://www.youtube.com/embed/1ac3_YdSSy0",
      "image": "https://i.ytimg.com/vi/1ac3_YdSSy0/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Hulu",
        "url": "http://www.hulu.com/fullmetal-alchemist-brotherhood"
      },
      {
        "name": "Crunchyroll",
        "url": "http://www.crunchyroll.com/fullmetal-alchemist-brotherhood"
      },
      {
        "name": "Amazon Prime Video",
        "url": "https://www.amazon.com/One-All/dp/B002T8C202/ref=sr_1_52/146-1307517-0174061?s=instant-video&rps=1&ie=UTF8&qid=1528858933&sr=1-52&refinements=p_n_theme_browse-bin%3A2650364011%2Cp_85%3A2470955011%2Cp_n_entity_type%3A14069184011%7C14069185011"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/70204981"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/s8lu95if3p"
      }
    ],
    "externalUrl": "https://anilist.co/anime/5114",
    "cached": true
  },
  {
    "malId": 104578,
    "anilistId": 104578,
    "idMal": 38524,
    "title": "Attack on Titan Season 3 Part 2",
    "titleDefault": "Shingeki no Kyojin Season 3 Part 2",
    "titleJapanese": "進撃の巨人 Season３ Part.2",
    "synopsis": "The battle to retake Wall Maria begins now! With Eren’s new hardening ability, the Scouts are confident they can seal the wall and take back Shiganshina District. If they succeed, Eren can finally unlock the secrets of the basement—and the world. But danger lies in wait as Reiner, Bertholdt, and the Beast Titan have plans of their own. Could this be humanity’s final battle for survival?\n\n(Source: Funimation)",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 10,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2019-04-29 to 2019-07-01",
    "year": 2019,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 624386,
    "members": 624386,
    "favorites": 29835,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      },
      {
        "malId": 11,
        "name": "Mystery"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "WIT STUDIO"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx104578-k61nx3LPjvgd.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx104578-k61nx3LPjvgd.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/104578-z7SadpYEuAsy.jpg",
    "trailer": {
      "youtubeId": "fJm2nD3cv_4",
      "url": "https://www.youtube.com/watch?v=fJm2nD3cv_4",
      "embedUrl": "https://www.youtube.com/embed/fJm2nD3cv_4",
      "image": "https://i.ytimg.com/vi/fJm2nD3cv_4/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/attack-on-titan"
      },
      {
        "name": "Hulu",
        "url": "https://www.hulu.com/series/attack-on-titan-9c91ffa3-dc20-48bf-8bc5-692e37c76d88"
      },
      {
        "name": "Adult Swim",
        "url": "https://www.adultswim.com/videos/attack-on-titan"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/70299043"
      }
    ],
    "externalUrl": "https://anilist.co/anime/104578",
    "cached": true
  },
  {
    "malId": 182469,
    "anilistId": 182469,
    "idMal": 60022,
    "title": "ONE PIECE FAN LETTER",
    "titleDefault": "ONE PIECE FAN LETTER",
    "titleJapanese": "ONE PIECE FAN LETTER",
    "synopsis": "Two years after the Paramount War, the Straw Hats are about to reunite on the Sabaody Archipelago. At the same time, a girl who is head over heels for Nami is trying to hand a fan letter to her before the group leaves the island.\n\n(Source: Crunchyroll)\n\nNote: This work commemorates the 25th anniversary of the ONE PIECE anime through an animated adaptation of the \"ONE PIECE novel Mugiwara Stories\" light novel.",
    "background": "",
    "type": "Special",
    "formatKey": "special",
    "source": "Light Novel",
    "episodes": 1,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2024-10-20",
    "year": 2024,
    "season": "fall",
    "duration": "25 min per ep",
    "rating": "",
    "score": 8.9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 60566,
    "members": 60566,
    "favorites": 3381,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Toei Animation"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx182469-JQ808NBPxmgn.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx182469-JQ808NBPxmgn.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/182469-obNr7bznMzN7.jpg",
    "trailer": {
      "youtubeId": "MewJ5bEM-5U",
      "url": "https://www.youtube.com/watch?v=MewJ5bEM-5U",
      "embedUrl": "https://www.youtube.com/embed/MewJ5bEM-5U",
      "image": "https://i.ytimg.com/vi/MewJ5bEM-5U/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/81947352"
      },
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/watch/G14UVQ5D5/one-piece-fan-letter"
      }
    ],
    "externalUrl": "https://anilist.co/anime/182469",
    "cached": true
  },
  {
    "malId": 9253,
    "anilistId": 9253,
    "idMal": 9253,
    "title": "Steins;Gate",
    "titleDefault": "Steins;Gate",
    "titleJapanese": "シュタインズ・ゲート",
    "synopsis": "Self-proclaimed mad scientist Okabe Rintarou lives in a small room in Akihabara, where he invents \"future gadgets\" with fellow lab members Shiina Mayuri, his air-headed childhood friend, and Hashida Itaru, an otaku hacker. The three pass the time by tinkering with their latest creation, a \"Phone Microwave\" that can be controlled through text messages.\n\nThe lab members soon face a string of mysterious incidents that lead to a game-changing discovery: the Phone Microwave can send emails to the past and thus alter history. Adapted from the critically acclaimed visual novel by 5pb. and Nitroplus, Steins;Gate takes Okabe to the depths of scientific theory and human despair as he faces the dire consequences of changing the past.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Visual Novel",
    "episodes": 24,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2011-04-06 to 2011-09-14",
    "year": 2011,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 607429,
    "members": 607429,
    "favorites": 54458,
    "genres": [
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 12,
        "name": "Psychological"
      },
      {
        "malId": 14,
        "name": "Sci-Fi"
      },
      {
        "malId": 18,
        "name": "Thriller"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "WHITE FOX"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-tIUXF2gfU8Sg.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx9253-tIUXF2gfU8Sg.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n9253-JIhmKgBKsWUN.jpg",
    "trailer": {
      "youtubeId": "27OZc-ku6is",
      "url": "https://www.youtube.com/watch?v=27OZc-ku6is",
      "embedUrl": "https://www.youtube.com/embed/27OZc-ku6is",
      "image": "https://i.ytimg.com/vi/27OZc-ku6is/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/steinsgate"
      },
      {
        "name": "Bilibili TV",
        "url": "https://www.bilibili.tv/en/media/37207"
      }
    ],
    "externalUrl": "https://anilist.co/anime/9253",
    "cached": true
  },
  {
    "malId": 124194,
    "anilistId": 124194,
    "idMal": 42938,
    "title": "Fruits Basket The Final Season",
    "titleDefault": "Fruits Basket: The Final",
    "titleJapanese": "フルーツバスケットThe Final",
    "synopsis": "After last season’s revelations, the Soma family moves forward, but the emotional chains that bind them are not easily broken. Unable to admit why she wants the cure, Tohru wrestles with the truth, aware that time is running out for someone close.\n\nAnd a secret still lurks that could break another’s heart. But hope is not lost—a clue to the curse is found. Could their imprisonment’s end be near?\n\n(Source: Funimation)\n\nNote: This season premiered on Funimation and AnimeLab on March 20, 2021. The Japanese broadcast started two weeks later on April 6, 2021.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": 13,
    "status": "Finished Airing",
    "statusKey": "complete",
    "airing": false,
    "aired": "2021-04-06 to 2021-06-29",
    "year": 2021,
    "season": "spring",
    "duration": "24 min per ep",
    "rating": "",
    "score": 8.9,
    "scoredBy": 0,
    "rank": null,
    "popularity": 179961,
    "members": 179961,
    "favorites": 11436,
    "genres": [
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 12,
        "name": "Psychological"
      },
      {
        "malId": 13,
        "name": "Romance"
      },
      {
        "malId": 15,
        "name": "Slice of Life"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "TMS Entertainment"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx124194-TJlqMMR7BGn9.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx124194-TJlqMMR7BGn9.jpg",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/124194-IB2X2IdALUYB.jpg",
    "trailer": {
      "youtubeId": "ci2XSskC_wA",
      "url": "https://www.youtube.com/watch?v=ci2XSskC_wA",
      "embedUrl": "https://www.youtube.com/embed/ci2XSskC_wA",
      "image": "https://i.ytimg.com/vi/ci2XSskC_wA/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com/fruits-basket"
      },
      {
        "name": "iQ",
        "url": "https://www.iq.com/album/168f5kx126l"
      },
      {
        "name": "Bilibili",
        "url": "https://www.bilibili.com/bangumi/media/md28233939"
      },
      {
        "name": "Hulu",
        "url": "https://www.hulu.com/series/fruits-basket-2019-93f78f8b-e56e-43b4-bae4-fc4367b55492"
      },
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/80987063"
      }
    ],
    "externalUrl": "https://anilist.co/anime/124194",
    "cached": true
  },
  {
    "malId": 198966,
    "anilistId": 198966,
    "idMal": 62516,
    "title": "Dandadan 3rd Season",
    "titleDefault": "Dandadan 3rd Season",
    "titleJapanese": "ダンダダン 第3期",
    "synopsis": "The third season of Dandadan.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": null,
    "status": "Not yet aired",
    "statusKey": "upcoming",
    "airing": false,
    "aired": "2027",
    "year": 2027,
    "season": "",
    "duration": "",
    "rating": "",
    "score": null,
    "scoredBy": 0,
    "rank": null,
    "popularity": 56116,
    "members": 56116,
    "favorites": 689,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      },
      {
        "malId": 14,
        "name": "Sci-Fi"
      },
      {
        "malId": 17,
        "name": "Supernatural"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Science SARU"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx198966-9Ji1GwIyRiiu.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx198966-9Ji1GwIyRiiu.jpg",
    "backdrop": "",
    "trailer": null,
    "streaming": [],
    "externalUrl": "https://anilist.co/anime/198966",
    "cached": true
  },
  {
    "malId": 181641,
    "anilistId": 181641,
    "idMal": 59873,
    "title": "Tokidoki Bosotto Rossiya-go de Dereru Tonari no Alya-san Season 2",
    "titleDefault": "Tokidoki Bosotto Rossiya-go de Dereru Tonari no Alya-san Season 2",
    "titleJapanese": "時々ボソッとロシア語でデレる隣のアーリャさん Season 2",
    "synopsis": "The second season of  Tokidoki Bosotto Russiago de Dereru Tonari no Alya-san.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Light Novel",
    "episodes": null,
    "status": "Not yet aired",
    "statusKey": "upcoming",
    "airing": false,
    "aired": "2027",
    "year": 2027,
    "season": "",
    "duration": "",
    "rating": "",
    "score": null,
    "scoredBy": 0,
    "rank": null,
    "popularity": 52539,
    "members": 52539,
    "favorites": 819,
    "genres": [
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 13,
        "name": "Romance"
      },
      {
        "malId": 15,
        "name": "Slice of Life"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Doga Kobo"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx181641-4BnzXGnA7CJL.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx181641-4BnzXGnA7CJL.jpg",
    "backdrop": "",
    "trailer": {
      "youtubeId": "sAJ_nczJnJM",
      "url": "https://www.youtube.com/watch?v=sAJ_nczJnJM",
      "embedUrl": "https://www.youtube.com/embed/sAJ_nczJnJM",
      "image": "https://i.ytimg.com/vi/sAJ_nczJnJM/hqdefault.jpg"
    },
    "streaming": [],
    "externalUrl": "https://anilist.co/anime/181641",
    "cached": true
  },
  {
    "malId": 171952,
    "anilistId": 171952,
    "idMal": 57584,
    "title": "Kage no Jitsuryokusha ni Naritakute!: Zankyou-hen",
    "titleDefault": "Kage no Jitsuryokusha ni Naritakute!: Zankyou-hen",
    "titleJapanese": "劇場版 陰の実力者になりたくて！ 残響編",
    "synopsis": "Theatrical follow-up to Kage no Jitsuryokusha ni Naritakute! 2nd season.",
    "background": "",
    "type": "Movie",
    "formatKey": "movie",
    "source": "Light Novel",
    "episodes": 1,
    "status": "Not yet aired",
    "statusKey": "upcoming",
    "airing": false,
    "aired": "2027",
    "year": 2027,
    "season": "",
    "duration": "",
    "rating": "",
    "score": null,
    "scoredBy": 0,
    "rank": null,
    "popularity": 51328,
    "members": 51328,
    "favorites": 835,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "Nexus"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171952-uB8CTTCBI1u5.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx171952-uB8CTTCBI1u5.jpg",
    "backdrop": "",
    "trailer": {
      "youtubeId": "eJFryCtdQQc",
      "url": "https://www.youtube.com/watch?v=eJFryCtdQQc",
      "embedUrl": "https://www.youtube.com/embed/eJFryCtdQQc",
      "image": "https://i.ytimg.com/vi/eJFryCtdQQc/hqdefault.jpg"
    },
    "streaming": [],
    "externalUrl": "https://anilist.co/anime/171952",
    "cached": true
  },
  {
    "malId": 209939,
    "anilistId": 209939,
    "idMal": 63816,
    "title": "Sousou no Frieren 3rd Season",
    "titleDefault": "Sousou no Frieren 3rd Season",
    "titleJapanese": "葬送のフリーレン 第3期",
    "synopsis": "The third season of Sousou no Frieren.",
    "background": "",
    "type": "TV",
    "formatKey": "tv",
    "source": "Manga",
    "episodes": null,
    "status": "Not yet aired",
    "statusKey": "upcoming",
    "airing": false,
    "aired": "2027-10",
    "year": 2027,
    "season": "fall",
    "duration": "",
    "rating": "",
    "score": null,
    "scoredBy": 0,
    "rank": null,
    "popularity": 49293,
    "members": 49293,
    "favorites": 564,
    "genres": [
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "MADHOUSE"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx209939-g2Njkml1rheG.jpg",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx209939-g2Njkml1rheG.jpg",
    "backdrop": "",
    "trailer": null,
    "streaming": [],
    "externalUrl": "https://anilist.co/anime/209939",
    "cached": true
  },
  {
    "malId": 178031,
    "anilistId": 178031,
    "idMal": 59068,
    "title": "Delicious in Dungeon Season 2",
    "titleDefault": "Dungeon Meshi 2nd Season",
    "titleJapanese": "ダンジョン飯 第２期",
    "synopsis": "The second season of Dungeon Meshi.",
    "background": "",
    "type": "ONA",
    "formatKey": "ona",
    "source": "Manga",
    "episodes": null,
    "status": "Not yet aired",
    "statusKey": "upcoming",
    "airing": false,
    "aired": "2027-10",
    "year": 2027,
    "season": "fall",
    "duration": "",
    "rating": "",
    "score": null,
    "scoredBy": 0,
    "rank": null,
    "popularity": 47894,
    "members": 47894,
    "favorites": 413,
    "genres": [
      {
        "malId": 2,
        "name": "Adventure"
      },
      {
        "malId": 3,
        "name": "Comedy"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "TRIGGER"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx178031-XNWYP6Qf18bB.png",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx178031-XNWYP6Qf18bB.png",
    "backdrop": "",
    "trailer": {
      "youtubeId": "qRrXciq7-88",
      "url": "https://www.youtube.com/watch?v=qRrXciq7-88",
      "embedUrl": "https://www.youtube.com/embed/qRrXciq7-88",
      "image": "https://i.ytimg.com/vi/qRrXciq7-88/hqdefault.jpg"
    },
    "streaming": [
      {
        "name": "Netflix",
        "url": "https://www.netflix.com/title/81564899"
      }
    ],
    "externalUrl": "https://anilist.co/anime/178031",
    "cached": true
  },
  {
    "malId": 143103,
    "anilistId": 143103,
    "idMal": 50668,
    "title": "Witch on the Holy Night",
    "titleDefault": "Mahoutsukai no Yoru",
    "titleJapanese": "魔法使いの夜",
    "synopsis": "Aoko Aozaki, an ordinary high school girl, is actually a Magician who lives in the modern world...though she is still only an apprentice. As she spends her days living alongside her housemate, Alice Kuonji, striving to become a full-fledged Magician...\n\nThe girl meets a boy.\n\nThis is the beginning of one young girl’s story — the tale of a Witch.\n\n(Source: Crunchyroll)",
    "background": "",
    "type": "Movie",
    "formatKey": "movie",
    "source": "Visual Novel",
    "episodes": 1,
    "status": "Not yet aired",
    "statusKey": "upcoming",
    "airing": false,
    "aired": "2026-11-20",
    "year": 2026,
    "season": "fall",
    "duration": "2 hr 9 min",
    "rating": "",
    "score": null,
    "scoredBy": 0,
    "rank": null,
    "popularity": 43780,
    "members": 43780,
    "favorites": 514,
    "genres": [
      {
        "malId": 1,
        "name": "Action"
      },
      {
        "malId": 4,
        "name": "Drama"
      },
      {
        "malId": 6,
        "name": "Fantasy"
      }
    ],
    "themes": [],
    "demographics": [],
    "studios": [
      "ufotable"
    ],
    "producers": [],
    "licensors": [],
    "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx143103-vvsaIpZPpIuE.png",
    "imageSmall": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx143103-vvsaIpZPpIuE.png",
    "backdrop": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/143103-KwDRPfPl4OwL.jpg",
    "trailer": {
      "youtubeId": "k1jyM2kSBzA",
      "url": "https://www.youtube.com/watch?v=k1jyM2kSBzA",
      "embedUrl": "https://www.youtube.com/embed/k1jyM2kSBzA",
      "image": "https://i.ytimg.com/vi/k1jyM2kSBzA/hqdefault.jpg"
    },
    "streaming": [],
    "externalUrl": "https://anilist.co/anime/143103",
    "cached": true
  }
];

const byId = new Map<number, Anime>(fallbackAnime.map((item) => [item.malId, item]));

export const fallbackAnimeById = (id: string | number): Anime | null =>
  byId.get(Number(id)) || null;

export const fallbackGenres = ANILIST_GENRES.map((name) => ({
  ...mapGenre(name),
  count: fallbackAnime.filter((item) => item.genres.some((genre) => genre.name === name)).length,
}));

export function fallbackHome(): Omit<HomeData, 'source'> {
  const scored = [...fallbackAnime].sort((a, b) => (b.score || 0) - (a.score || 0));
  const latest = [...fallbackAnime].sort((a, b) => (b.year || 0) - (a.year || 0));
  const upcoming = fallbackAnime
    .filter((item) => item.status === 'Not yet aired')
    .slice(0, 6);

  return {
    hero: scored.slice(0, 5),
    trending: fallbackAnime.slice(0, 12),
    latest: latest.slice(0, 12),
    topRated: scored.slice(0, 12),
    upcoming: upcoming.length ? upcoming : fallbackAnime.slice(-6),
    genres: fallbackGenres,
  };
}

export interface FallbackSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  genres?: string[];
  year?: number | null;
  format?: string | null;
  status?: string | null;
}

export function fallbackSearch({
  q = '',
  page = 1,
  limit = 24,
  genres = [],
  year = null,
  format = null,
  status = null,
}: FallbackSearchParams = {}): { data: Anime[]; meta: { pagination: Pagination } } {
  const needle = String(q || '').trim().toLowerCase();

  const matched = fallbackAnime.filter((item) => {
    if (needle) {
      const haystack = `${item.title} ${item.titleDefault} ${item.synopsis}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    if (genres.length && !item.genres.some((genre) => genres.includes(genre.name))) return false;
    if (year && item.year !== Number(year)) return false;
    if (format && item.formatKey !== format) return false;
    if (status && item.statusKey !== status) return false;
    return true;
  });

  const safeLimit = Math.min(Math.max(Number(limit) || 24, 1), 50);
  const safePage = Math.max(Number(page) || 1, 1);
  const start = (safePage - 1) * safeLimit;

  return {
    data: matched.slice(start, start + safeLimit),
    meta: {
      pagination: {
        page: safePage,
        lastPage: Math.max(1, Math.ceil(matched.length / safeLimit)),
        hasNextPage: start + safeLimit < matched.length,
        items: matched.length,
        limit: safeLimit,
      },
    },
  };
}

export function fallbackRecommendations(malId: number | string): Anime[] {
  const source = fallbackAnimeById(malId);
  if (!source) return fallbackAnime.slice(0, 8);

  const sourceGenres = new Set(source.genres.map((genre) => genre.name));
  return fallbackAnime
    .filter((item) => item.malId !== source.malId)
    .map((item) => ({
      item,
      overlap: item.genres.filter((genre) => sourceGenres.has(genre.name)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 8)
    .map((entry) => entry.item);
}
