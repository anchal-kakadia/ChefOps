const request = require('supertest');
const { app, menuItems } = require('../src/app');

describe('GET /menu', () => {
  it('responds with menu items and metadata', async () => {
    const response = await request(app).get('/menu');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('items');
    expect(Array.isArray(response.body.items)).toBe(true);
    expect(response.body.items.length).toBe(menuItems.length);
    expect(response.body).toHaveProperty('metadata');
    expect(response.body.metadata).toHaveProperty('currency', 'USD');
  });
});
