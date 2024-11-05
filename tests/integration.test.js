const request = require('supertest')
const app = require('../index')
const { describe, expect, it } = require('@jest/globals') // import your server instance

describe('API Endpoints', () => {
    it('GET /api/books - should return all resources', async () => {
        const response = await request(app).get('/api/books')
        expect(response.statusCode).toBe(401)
    })
})
