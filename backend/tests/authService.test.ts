import bcrypt from 'bcrypt';
import User from '../src/models/User';
import { createUser, authenticateUser } from '../src/services/authService';
import { ApiError } from '../src/utils/apiError';

describe('Auth service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new user when email is not registered', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null as any);
    jest.spyOn(User, 'create').mockResolvedValue({ _id: '123', email: 'student@example.com', password: 'hashed', name: 'Student' } as any);

    const user = await createUser({ email: 'student@example.com', password: 'securePass123', name: 'Student' });

    expect(user.email).toBe('student@example.com');
    expect(User.findOne).toHaveBeenCalledWith({ email: 'student@example.com' });
  });

  it('throws a conflict error when the user already exists', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'student@example.com' } as any);

    await expect(createUser({ email: 'student@example.com', password: 'securePass123' })).rejects.toThrow(ApiError);
  });

  it('authenticates an existing user with correct credentials', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'student@example.com', password: 'hashed-password' } as any);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    const user = await authenticateUser('student@example.com', 'securePass123');

    expect(user.email).toBe('student@example.com');
  });

  it('throws unauthorized error for invalid credentials', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null as any);

    await expect(authenticateUser('missing@example.com', 'wrong')).rejects.toThrow(ApiError);
  });
});
