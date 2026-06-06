import { z } from 'zod';

export const analyzeJournalSchema = z.object({
  body: z.object({ text: z.string().min(1, { message: 'Journal text is required' }) })
});

export const chatSchema = z.object({
  body: z.object({ message: z.string().min(1, { message: 'Message cannot be empty' }) })
});
