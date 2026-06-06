import { registerSchema, loginSchema } from '../src/validators/authValidator';
import { moodEntrySchema } from '../src/validators/moodValidator';
import { journalEntrySchema } from '../src/validators/journalValidator';

describe('Request validators', () => {
  it('accepts valid registration payload', () => {
    const result = registerSchema.safeParse({ body: { email: 'student@example.com', password: 'securePass123', name: 'Student' } });
    expect(result.success).toBe(true);
  });

  it('rejects invalid login payload', () => {
    const result = loginSchema.safeParse({ body: { email: 'invalid', password: '' } });
    expect(result.success).toBe(false);
  });

  it('rejects invalid mood entry values', () => {
    const result = moodEntrySchema.safeParse({ body: { mood: 'Unknown', sleepHours: -1, studyHours: 30, stressLevel: 15, confidenceLevel: 0 } });
    expect(result.success).toBe(false);
  });

  it('accepts valid journal entry payload', () => {
    const result = journalEntrySchema.safeParse({ body: { text: 'Today I studied and managed stress with short breaks.' } });
    expect(result.success).toBe(true);
  });
});
