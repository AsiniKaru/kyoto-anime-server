import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../src/config/db.js'

dotenv.config();

connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json()); 

// A simple test route
app.get('/', (req: Request, res: Response) => {
  res.send('Kyoto Anime Server is running...');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is blazing fast and running on port ${PORT}`);
});