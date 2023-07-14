import request from 'supertest';
import app from '../app';

let userId: number;
const testUser = { fullName: 'John Doe' };

describe('users', () => {
  afterEach(async () => {
    if (userId) {
      await request(app).delete(`/api/users/${userId}`);
    }
  });

  describe('GET /api/users', () => {
    it('should return 200', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
    });
    it('should return an array', async () => {
      const res = await request(app).get('/api/users');
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/users', () => {
    it('should return 200 and an id property', async () => {
      const res = await request(app).post('/api/users').send(testUser);
      userId = res.body.id;
      expect(res.status).toBe(200);
      expect(typeof res.body.id).toBe('number');
    });
  });

  describe('PATCH /api/users/:id', () => {
    beforeEach(async () => {
      const res = await request(app).post('/api/users').send(testUser);
      userId = res.body.id;
    });
    it('should return 200 and an id property', async () => {
      const res = await request(app).patch(`/api/users/${userId}`).send({ fullName: 'Jane Doe' });
      expect(res.status).toBe(200);
      expect(typeof res.body.id).toBe('number');
    });
  });

  describe('DELETE /api/users/:id', () => {
    beforeEach(async () => {
      const res = await request(app).post('/api/users').send(testUser);
      userId = res.body.id;
    });
    it('should return 200 and delete the user', async () => {
      const res = await request(app).delete(`/api/users/${userId}`);
      expect(res.status).toBe(200);
      const getRes = await request(app).get(`/api/users/${userId}`);
      expect(getRes.status).toBe(404);
    });
  });
});
