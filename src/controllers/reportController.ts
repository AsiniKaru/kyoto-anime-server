import type { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import Watchlist from '../models/watchlistModel.js';
import History from '../models/historyModel.js';
import Review from '../models/reviewModel.js';
import { buildAdminStats } from './adminController.js';

function sendPdf(res: Response, filename: string, title: string, lines: string[]): void {
  const doc = new PDFDocument({ margin: 40 });
  const chunks: Buffer[] = [];

  doc.on('data', (chunk: Buffer) => {
    chunks.push(chunk);
  });

  doc.on('end', () => {
    const buffer = Buffer.concat(chunks);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  });

  doc.fontSize(20).text(title);
  doc.moveDown();
  doc.fontSize(11);
  for (const line of lines) {
    doc.text(line);
  }
  doc.end();
}

/** Personal library report for the signed-in user. */
export const getLibraryReport = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(403, 'Not authorized');
  }

  const [watchlistCount, historyCount, reviewCount] = await Promise.all([
    Watchlist.countDocuments({ user: user._id }),
    History.countDocuments({ user: user._id }),
    Review.countDocuments({ user: user._id }),
  ]);

  const lines = [
    `Generated: ${new Date().toISOString()}`,
    `Member: ${user.email ?? 'member'}`,
    ``,
    `Watchlist items: ${watchlistCount}`,
    `History entries: ${historyCount}`,
    `Reviews: ${reviewCount}`,
  ];

  return sendPdf(res, 'kyoto-anime-library-report.pdf', 'Kyoto Anime - Personal Library Report', lines);
});

/** Platform wide analytics report for admins. */
export const getPlatformReport = asyncHandler(async (_req, res) => {
  const stats = await buildAdminStats();

  const lines = [
    `Generated: ${new Date().toISOString()}`,
    ``,
    `Total users: ${stats.totals.users}`,
    `Administrators: ${stats.totals.admins}`,
    `Watchlist items: ${stats.totals.watchlist}`,
    `History entries: ${stats.totals.history}`,
    `Reviews: ${stats.totals.reviews}`,
    ``,
    `Average rating: ${stats.averageRating ?? 'n/a'}`,
    `Top anime: ${stats.topAnime.map((item) => `${item.title} (${item.count})`).join(', ') || 'n/a'}`,
    `Top genres: ${stats.topGenres.map((item) => `${item.genre} (${item.count})`).join(', ') || 'n/a'}`,
    `Recent reviews: ${stats.recentReviews.length}`,
  ];

  return sendPdf(res, 'kyoto-anime-platform-report.pdf', 'Kyoto Anime - Platform Report', lines);
});
