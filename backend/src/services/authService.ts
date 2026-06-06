import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { ApiError } from '../utils/apiError';
import { config } from '../config';

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export async function createUser(input: RegisterInput): Promise<IUser> {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new ApiError('User already exists', 409);
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await User.create({ email: input.email, password: passwordHash, name: input.name });
  return user;
}

export async function authenticateUser(email: string, password: string): Promise<IUser> {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new ApiError('Invalid credentials', 401);
  }

  return user;
}

export function buildJwtToken(userId: string) {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '24h', algorithm: 'HS256' });
}
