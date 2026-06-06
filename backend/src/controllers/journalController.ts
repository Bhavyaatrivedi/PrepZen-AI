import { Request, Response } from 'express';
import { createJournalEntry, getJournalHistoryForUser } from '../services/journalService';

export async function createJournal(req: Request, res: Response) {
  const userId = req.userId!;
  const { text } = req.body;
  const result = await createJournalEntry(userId, text);
  res.json(result);
}

export async function getJournalHistory(req: Request, res: Response) {
  const userId = req.userId!;
  const entries = await getJournalHistoryForUser(userId, 365);
  res.json(entries);
}
