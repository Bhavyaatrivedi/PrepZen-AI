import { Types } from 'mongoose';

declare module 'xss-clean';

declare global {
  namespace Express {
    interface Request {
      userId?: string | Types.ObjectId;
    }
  }
}
