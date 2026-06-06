import { Request, Response } from 'express';
import { computeAnalyticsForUser } from '../services/analyticsService';

export async function getAnalytics(req: Request, res: Response) {
  const userId = (req as any).userId;
  const data = await computeAnalyticsForUser(userId);
  res.json(data);
}
