import { type LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id.usecase'
import { DbLoadSurveyById } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id.usecase'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb/survey/survey-mongodb-repository'

export const makeLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveyById(surveyMongoDbRepository)
}
