import { z } from 'zod';

export const moodEntrySchema = z.object({
  body: z.object({
    mood: z.enum(['😀 Happy', '🙂 Calm', '😐 Neutral', '😟 Anxious', '😢 Sad', '😫 Burned Out']),
    sleepHours: z.number().min(0, { message: 'Sleep hours must be 0 or more' }).max(24),
    studyHours: z.number().min(0, { message: 'Study hours must be 0 or more' }).max(24),
    stressLevel: z.number().min(1, { message: 'Stress level is required' }).max(10),
    confidenceLevel: z.number().min(1, { message: 'Confidence level is required' }).max(10)
  })
});
