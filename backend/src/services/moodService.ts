import { Types } from 'mongoose';
import MoodEntry, { IMoodEntry } from '../models/MoodEntry';

export interface MoodEntryPayload {
  mood: string;
  sleepHours: number;
  studyHours: number;
  stressLevel: number;
  confidenceLevel: number;
}

export async function createMoodEntry(userId: string | Types.ObjectId, payload: MoodEntryPayload): Promise<IMoodEntry> {
  return MoodEntry.create({
    user: new Types.ObjectId(userId),
    mood: payload.mood,
    sleepHours: payload.sleepHours,
    studyHours: payload.studyHours,
    stressLevel: payload.stressLevel,
    confidenceLevel: payload.confidenceLevel
  });
}

export async function getMoodHistoryForUser(userId: string | Types.ObjectId, limit = 365): Promise<IMoodEntry[]> {
  return MoodEntry.find({ user: new Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}
