import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'
import env from '@/main/config/env'
import app from '@/main/config/app'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Victor',
    email: 'victorscanto@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

const makeFakeSurveysData = (): any => ([
  {
    question: 'Question 1',
    answers: [{
      answer: 'Answer 1',
      image: 'http://image-name.com'
    }, {
      answer: 'Answer 2'
    }],
    date: new Date()
  }
])

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
    accountCollection = await MongoDbHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question 1',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question 1',
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

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 204 on load surveys with valid accessToken when there are no surveys', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on load surveys with valid accessToken when there are surveys', async () => {
      const accessToken = await makeAccessToken()
      await surveyCollection.insertMany(makeFakeSurveysData())
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
