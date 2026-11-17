import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { env, isProduction } from './config/env.js';
import { databaseState } from './config/db.js';
import routes from './routes/indexRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlerMiddleware.js';
import { apiLimiter } from './middleware/rateLimitMiddleware.js';
import mongoSanitize from 'express-mongo-sanitize';
import aiRoutes from './routes/aiRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
        connectSrc: ["'self'", 'https:'],
        frameSrc: ["'self'", 'https:'],
        mediaSrc: ["'self'", 'https:', 'blob:'],
        upgradeInsecureRequests: null,
      },
    },
  })
);

app.use(
  cors((req, callback) => {
    const origin = req.headers.origin;
    const selfOrigin = `${req.protocol}://${req.get('host')}`;
    
    // Added your Vercel URL to the allowed list
    const allowed = !origin || 
                    env.clientUrls.includes(origin) || 
                    origin === selfOrigin || 
                    origin === 'https://kyoto-anime-client.vercel.app';
                    
    callback(null, { origin: allowed, credentials: true });
  })
);
app.use('/api/ai', aiRoutes);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());

if (env.nodeEnv !== 'test') {
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
}

app.get('/api/health', (_req, res) => {
  const database = databaseState();
  res.json({
    success: true,
    status: 'ok',
    database,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiLimiter, routes);

// In production, serve the built React app from the same server (optional)
const clientDist = path.resolve(__dirname, '../../kyoto anime client/dist');
if (isProduction && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    return res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
