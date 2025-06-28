const request = require('supertest');
const app = require('../server');

describe('Auth Controller', () => {
  it('should return 401 for invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'wrong', password: 'wrong' });
    expect(res.statusCode).toBe(401);
  });
  // Add more tests as needed
});
