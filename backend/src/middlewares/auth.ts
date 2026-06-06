import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { ApiError } from '../utils/apiError';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) {
    return next(new ApiError('Unauthorized', 401));
  }

  const token = auth.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] }) as { id: string };
    req.userId = decoded.id;
    next();
  } catch {
    next(new ApiError('Invalid token', 401));
  }
}
