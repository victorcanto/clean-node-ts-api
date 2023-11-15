import request from 'supertest'
import app from '../config/app'
import { MongoDbHelper } from '../../infra/db/mongodb/helpers/mongodb.helper'

describe('CORS Middleware', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoDbHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoDbHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

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
