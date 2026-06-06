import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import mongoose from 'mongoose';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { config } from './config';

const app = express();
app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGINS?.split(',') || true,
    credentials: true
  })
);
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use('/api', routes);

app.use(errorHandler);

export default app;
