import { Request, Response } from 'express';
import { createMoodEntry, getMoodHistoryForUser } from '../services/moodService';

export async function createMood(req: Request, res: Response) {
  const userId = req.userId!;
  const entry = await createMoodEntry(userId, req.body);
  res.json(entry);
}

export async function getMoodHistory(req: Request, res: Response) {
  const userId = req.userId!;
  const entries = await getMoodHistoryForUser(userId, 365);
  res.json(entries);
}
