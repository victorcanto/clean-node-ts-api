import { type AddSurveyModel } from '@/domain/usecases/survey/add-survey.usecase'
import { type AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { type SurveyModel, type LoadSurveysRepository } from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols'
import { type LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'
import { ObjectId } from 'mongodb'

export class SurveyMongoDbRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoDbHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoDbHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray() as unknown as SurveyModel[]
    return surveys && MongoDbHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoDbHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne<SurveyModel>({ _id: new ObjectId(id) }) as SurveyModel
    return survey && MongoDbHelper.map(survey)
  }
}
