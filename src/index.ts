import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // CHANGED: simpler path (was '../src/config/db.js')
import authRoutes from './routes/authRoutes.js';
import animeRoutes from './routes/animeRoutes.js'; // NEW

dotenv.config();

connectDB();

const app: Application = express();

// CHANGED: only allow your frontend instead of every website
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes); // NEW

// A simple test route
app.get('/', (req: Request, res: Response) => {
  res.send('Kyoto Anime Server is running...');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});