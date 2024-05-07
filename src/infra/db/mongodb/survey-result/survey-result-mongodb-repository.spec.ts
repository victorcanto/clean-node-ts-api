import { type SurveyModel } from '@/domain/models/survey.model'
import { type SurveyResultModel } from '@/domain/models/survey-result.model'
import { type AccountModel } from '@/domain/models/account.model'
import { mockAddAccountParams, mockAddSurveyParams } from '@/domain/test'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers'
import { SurveyResultMongoDbRepository } from './survey-result-mongodb-repository'
import MockDate from 'mockdate'
import { ObjectId, type Collection } from 'mongodb'

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
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection.find({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id)
      }).toArray() as unknown as SurveyResultModel[]
      expect(surveyResult).toBeTruthy()
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
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.find({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id)
      }).toArray() as unknown as SurveyResultModel[]
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[1].count).toBe(2)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[2].count).toBe(0)
      expect(surveyResult.answers[2].percent).toBe(0)
    })

    test('Should return null if there is no survey result', async () => {
      const survey = await mockSurvey()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id)
      expect(surveyResult).toBeNull()
    })
  })
})
