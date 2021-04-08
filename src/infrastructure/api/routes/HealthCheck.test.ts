import request from 'supertest'
import server from '../index'

describe('HealthCheck Route Tests', () => {
  test('should return status 200 when called', async () => {
    const res = await request(server).get('/api/healthcheck')
    expect(res.status).toBe(200)
  })
})
