import { Request, Response } from 'express';
import MoodEntry from '../models/MoodEntry';

export async function createMood(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { mood, sleepHours, studyHours, stressLevel, confidenceLevel } = req.body;
  const entry = await MoodEntry.create({ user: userId, mood, sleepHours, studyHours, stressLevel, confidenceLevel });
  res.json(entry);
}

export async function getMoodHistory(req: Request, res: Response) {
  const userId = (req as any).userId;
  const entries = await MoodEntry.find({ user: userId }).sort({ createdAt: -1 }).limit(365);
  res.json(entries);
}
