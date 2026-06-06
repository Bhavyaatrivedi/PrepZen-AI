import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  res.status(err.statusCode || err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
}
