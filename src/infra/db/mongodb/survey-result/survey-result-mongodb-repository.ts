import { type SurveyResultModel } from '@/domain/models/survey-result.model'
import { type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'
import { type SaveSurveyResultRepository } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'

export class SurveyResultMongoDbRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoDbHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return res?._id && MongoDbHelper.map({ ...res, ...data })
  }
}
