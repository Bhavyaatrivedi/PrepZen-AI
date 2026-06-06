import { Request, Response } from 'express';
import { createUser, authenticateUser, buildJwtToken } from '../services/authService';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const user = await createUser({ email, password, name });
  const token = buildJwtToken(user._id.toString());
  res.json({ token, user: { id: user._id.toString(), email: user.email, name: user.name } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  const token = buildJwtToken(user._id.toString());
  res.json({ token, user: { id: user._id.toString(), email: user.email, name: user.name } });
}
