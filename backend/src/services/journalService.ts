import { Types } from 'mongoose';
import JournalEntry, { IJournalEntry } from '../models/JournalEntry';
import AIAnalysis, { IAIAnalysis } from '../models/AIAnalysis';
import { runJournalAnalysis } from './openaiService';

interface JournalResult {
  journal: IJournalEntry;
  analysis: IAIAnalysis;
}

export async function createJournalEntry(userId: string | Types.ObjectId, text: string): Promise<JournalResult> {
  const userObjectId = new Types.ObjectId(userId);
  const journal = await JournalEntry.create({ user: userObjectId, text });
  const analysisResult = await runJournalAnalysis(userId.toString(), journal._id.toString(), text);
  const ai = await AIAnalysis.create({ user: userObjectId, journal: journal._id, ...analysisResult });
  journal.analysis = ai._id;
  await journal.save();
  return { journal, analysis: ai };
}

export async function getJournalHistoryForUser(userId: string | Types.ObjectId, limit = 365) {
  return JournalEntry.find({ user: new Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('analysis')
    .lean();
}
