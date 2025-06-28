const request = require('supertest');
const app = require('../server');

describe('Post Controller', () => {
  it('should require authentication to create a post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ content: 'Test post' });
    expect(res.statusCode).toBe(401);
  });
  // Add more tests as needed
});
