const request = require('supertest');
const app = require('../server');

describe('User Controller', () => {
  it('should return 404 for non-existent user', async () => {
    const res = await request(app)
      .get('/api/users/nonexistentuser');
    expect(res.statusCode).toBe(404);
  });
  // Add more tests as needed
});
