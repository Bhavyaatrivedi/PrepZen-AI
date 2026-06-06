import { z } from 'zod';

const email = z.string().email({ message: 'Valid email is required' });
const password = z.string().min(8, { message: 'Password must be at least 8 characters' });
const name = z.string().min(1, { message: 'Name is required' }).optional();

export const registerSchema = z.object({
  body: z.object({ email, password, name })
});

export const loginSchema = z.object({
  body: z.object({ email, password })
});
