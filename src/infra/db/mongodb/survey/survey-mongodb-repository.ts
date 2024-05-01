import { type AddSurveyModel } from '@/domain/usecases/add-survey.usecase'
import { type AddSurveyRepository } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { type SurveyModel, type LoadSurveysRepository } from '@/data/usecases/load-surveys/db-load-surveys-protocols'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'

export class SurveyMongoDbRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoDbHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoDbHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray() as unknown as SurveyModel[]
    return surveys
  }
}
