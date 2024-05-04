import { type SurveyModel } from '@/domain/models/survey.model'
import { type AccountModel } from '@/domain/models/account.model'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'
import { SurveyResultMongoDbRepository } from './survey-result-mongodb-repository'
import { type Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mockAddAccountParams, mockAddSurveyParams } from '@/domain/test'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockSurvey = async (): Promise<SurveyModel> => {
  const survey = mockAddSurveyParams()
  const res = await surveyCollection.insertOne(survey)
  return { id: res.insertedId.toString(), ...survey }
}

const mockAccount = async (): Promise<AccountModel> => {
  const account = mockAddAccountParams()
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
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })

    test('Should add a survey if its not new', async () => {
      const survey = await mockSurvey()
      const account = await mockAccount()
      const res = await surveyResultCollection.insertOne({
        surveyId: survey.id,
        accountId: account.id,
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
      expect(surveyResult.id).toEqual(res.insertedId)
      expect(surveyResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
