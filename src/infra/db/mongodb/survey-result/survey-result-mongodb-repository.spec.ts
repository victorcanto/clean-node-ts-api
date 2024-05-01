import { type SurveyModel } from '@/domain/models/survey.model'
import { type AccountModel } from '@/domain/models/account.model'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'
import { SurveyResultMongoDbRepository } from './survey-result-mongodb-repository'
import { type Collection } from 'mongodb'
import MockDate from 'mockdate'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSurvey = async (): Promise<SurveyModel> => {
  const survey = {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  }
  const res = await surveyCollection.insertOne(survey)
  return { id: res.insertedId.toString(), ...survey }
}

const makeAccount = async (): Promise<AccountModel> => {
  const account = {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
  }
  const res = await accountCollection.insertOne(account)
  return { id: res.insertedId.toString(), ...account }
}

const makeSut = (): SurveyResultMongoDbRepository => {
  return new SurveyResultMongoDbRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoDbHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoDbHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoDbHelper.getCollection('surveys')
    await surveyCollection.deleteMany()
    surveyResultCollection = await MongoDbHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany()
    accountCollection = await MongoDbHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

  describe('save()', () => {
    test('Should add a survey if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })
})
