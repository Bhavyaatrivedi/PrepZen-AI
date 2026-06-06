import { Request, Response } from 'express';
import JournalEntry from '../models/JournalEntry';
import AIAnalysis from '../models/AIAnalysis';
import { runJournalAnalysis } from '../services/openaiService';

export async function createJournal(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { text } = req.body;
  const journal = await JournalEntry.create({ user: userId, text });
  // call AI analysis async
  const analysisResult = await runJournalAnalysis(userId, journal._id, text);
  const ai = await AIAnalysis.create({ user: userId, journal: journal._id, ...analysisResult });
  journal.analysis = ai._id;
  await journal.save();
  res.json({ journal, analysis: ai });
}

export async function getJournalHistory(req: Request, res: Response) {
  const userId = (req as any).userId;
  const entries = await JournalEntry.find({ user: userId }).sort({ createdAt: -1 }).limit(365).populate('analysis');
  res.json(entries);
}
