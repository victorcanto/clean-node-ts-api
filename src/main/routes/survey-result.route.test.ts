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
    password: '123'
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

const makeFakeSurveyData = (): any => (
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
)

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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const surveyData = makeFakeSurveyData()
      const res = await surveyCollection.insertOne(surveyData)
      await request(app)
        .put(`/api/surveys/${res.insertedId.toString()}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: surveyData.answers[0].answer
        })
        .expect(200)
    })
  })
})
