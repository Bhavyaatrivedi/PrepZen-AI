import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import mongoose from 'mongoose';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

app.use('/api', routes);

app.use(errorHandler);

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/prepzen';
mongoose.connect(MONGO).then(() => console.log('MongoDB connected'));

export default app;
