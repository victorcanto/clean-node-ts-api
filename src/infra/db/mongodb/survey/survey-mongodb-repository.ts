import { type AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'
import { type AddSurveyModel } from '../../../../domain/usecases/add-survey.usecase'
import { MongoDbHelper } from '../helpers/mongodb.helper'

export class SurveyMongoDbRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoDbHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
