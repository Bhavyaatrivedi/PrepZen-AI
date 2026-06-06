import { z } from 'zod';

export const journalEntrySchema = z.object({
  body: z.object({
    text: z.string().min(10, { message: 'Journal entry must be at least 10 characters' })
  })
});
