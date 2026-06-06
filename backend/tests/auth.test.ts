import request from 'supertest';
import app from '../src/app';

describe('Auth API', () => {
  it('rejects registration with missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: '' });
    expect(res.status).toBe(400);
  });
});
