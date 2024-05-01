import { type Collection } from 'mongodb'
import MockDate from 'mockdate'
import { MongoDbHelper } from '../helpers/mongodb.helper'
import { SurveyMongoDbRepository } from './survey-mongodb-repository'
import { type AddSurveyModel } from '../../../../domain/usecases/add-survey.usecase'

let surveyCollection: Collection

const makeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, { answer: 'other_answer' }],
  date: new Date()
})

const makeSurveysData = (): AddSurveyModel[] => {
  return [{
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

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
      await sut.add(makeSurveyData())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const sut = makeSut()
      const surveysData = makeSurveysData()
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
})
