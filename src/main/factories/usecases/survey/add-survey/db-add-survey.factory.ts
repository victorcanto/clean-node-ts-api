import { type AddSurvey } from '@/domain/usecases/add-survey.usecase'
import { DbAddSurvey } from '@/data/usecases/add-survey/db-add-survey.usecase'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb/survey/survey-mongodb-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbAddSurvey(surveyMongoDbRepository)
}
