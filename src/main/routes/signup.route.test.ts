import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Victor',
        email: 'victorscanto@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
