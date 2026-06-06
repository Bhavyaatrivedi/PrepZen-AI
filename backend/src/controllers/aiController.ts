import { Request, Response } from 'express';
import { runJournalAnalysis, runChat } from '../services/openaiService';

export async function analyzeJournal(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { text } = req.body;
  const result = await runJournalAnalysis(userId, undefined, text);
  res.json(result);
}

export async function chatWithCoach(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { message } = req.body;
  const reply = await runChat(userId, message);
  res.json({ reply });
}
