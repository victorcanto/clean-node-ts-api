import { type AddSurvey } from '@/domain/usecases/survey/add-survey.usecase'
import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey.usecase'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb/survey/survey-mongodb-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbAddSurvey(surveyMongoDbRepository)
}
