import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiError } from '../utils/apiError';

export function validateRequest(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map(({ path, message }) => `${path.join('.')}: ${message}`).join(', ');
        return next(new ApiError(message, 400));
      }
      next(error);
    }
  };
}
