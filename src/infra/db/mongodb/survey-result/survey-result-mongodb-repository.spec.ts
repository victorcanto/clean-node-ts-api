import { type SurveyModel } from '@/domain/models/survey.model'
import { type AccountModel } from '@/domain/models/account.model'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'
import { SurveyResultMongoDbRepository } from './survey-result-mongodb-repository'
import { ObjectId, type Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mockAddAccountParams, mockAddSurveyParams } from '@/domain/test'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockSurvey = async (): Promise<SurveyModel> => {
  const survey = mockAddSurveyParams()
  const res = await surveyCollection.insertOne(survey)
  return MongoDbHelper.map({ id: res.insertedId.toString(), ...survey })
}

const mockAccount = async (): Promise<AccountModel> => {
  const account = mockAddAccountParams()
  const res = await accountCollection.insertOne(account)
  return MongoDbHelper.map({ id: res.insertedId.toString(), ...account })
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
      const survey = await mockSurvey()
      const account = await mockAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })

    test('Should add a survey if its not new', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })
  })
})
