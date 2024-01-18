import { type Collection } from 'mongodb'
import { MongoDbHelper } from '../helpers/mongodb.helper'
import { SurveyMongoDbRepository } from './survey-mongodb-repository'
import { type AddSurveyModel } from '../../../../domain/usecases/add-survey.usecase'

let surveyCollection: Collection

const makeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, { answer: 'other_answer' }]
})

const makeSut = (): SurveyMongoDbRepository => {
  return new SurveyMongoDbRepository()
}

describe('Account Mongo Repository', () => {
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

  test('Should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeSurveyData())
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
