import request from 'supertest'
import app from '../config/app'
import { MongoDbHelper } from '../../infra/db/mongodb/helpers/mongodb.helper'
import { type Collection } from 'mongodb'

let surveyCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoDbHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoDbHelper.getCollection('surveys')
    await surveyCollection.deleteMany()
  })

  describe('POST /surveys', () => {
    test('Should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
  })
})
