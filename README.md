# Kyoto Anime - Backend API

REST API for the Kyoto Anime full-stack application. Built with Node.js, Express and
TypeScript, backed by MongoDB (Mongoose). Provides anime metadata (via AniList), JWT
authentication with refresh-token rotation, personal libraries (watchlist, history,
reviews), and an admin analytics/reporting API.

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken) + bcryptjs
- Zod (validation)
- Helmet, CORS, Morgan, express-rate-limit
- PDFKit (PDF reports)

## Setup & Run

```bash
npm install
cp .example.env .env   # fill in the values
npm run dev            # http://localhost:5001
```

### Scripts

- `npm run dev` - start with tsx watch
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run the compiled server (`dist/server.js`)
- `npm run seed:admin` - create/repair the admin account
- `npm run seed:demo` - create a demo member with sample data

## Environment Variables

See `.example.env`. Key variables:

- `MONGODB_URI` - MongoDB Atlas connection string
- `PORT` - server port (default 5001)
- `JWT_SECRET` - signing secret for access tokens
- `JWT_EXPIRES_IN` - access token lifetime
- `REFRESH_TOKEN_DAYS` - refresh token lifetime in days
- `CLIENT_URL` / `CLIENT_URLS` - allowed frontend origins (CORS)
- `ANILIST_API_URL` - AniList GraphQL endpoint
- `YOUTUBE_API_KEY` - (optional) YouTube Data API key


## API Overview

- `GET  /api/health` - health check
- `POST /api/auth/register|login|refresh|logout`
- `GET  /api/auth/me`
- `PATCH /api/auth/profile`, `/api/auth/password`
- `DELETE /api/auth/account`
- `GET  /api/anime/home|search|seasonal|genres|random`
- `GET  /api/anime/:id`, `/:id/episodes`, `/:id/recommendations`, `/:id/characters`, `/:id/trailer`
- `GET/POST/PATCH/DELETE /api/library/watchlist[/:malId]`
- `GET/POST/DELETE /api/library/history[/:malId]`
- `GET/POST/DELETE /api/library/reviews[/:id]`
- `GET  /api/library/stats`, `/api/library/report.pdf`
- `GET  /api/admin/stats`, `/api/admin/users`, `/api/admin/reviews`, `/api/admin/report.pdf`

## License

Kyoto Anime - Rapid Application Development (RAD) final coursework.
