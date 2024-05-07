import { MongoDbHelper } from '@/infra/db/mongodb/helpers'
import { SurveyMongoDbRepository } from './survey-mongodb-repository'
import { type Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mockAddSurveyParams, mockAddSurveysParams } from '@/domain/test'

let surveyCollection: Collection

const makeSut = (): SurveyMongoDbRepository => {
  return new SurveyMongoDbRepository()
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
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSurveyParams())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const sut = makeSut()
      const surveysData = mockAddSurveysParams()
      await surveyCollection.insertMany(surveysData)
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe(surveysData[0].question)
      expect(surveys[1].question).toBe(surveysData[1].question)
    })

    test('Should load empty list if there are no surveys', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const sut = makeSut()
      const surveyData = mockAddSurveyParams()
      const { insertedId } = await surveyCollection.insertOne(surveyData)
      const survey = await sut.loadById(insertedId.toString())
      expect(survey).toBeTruthy()
      expect(survey.question).toBe(surveyData.question)
    })
  })
})
