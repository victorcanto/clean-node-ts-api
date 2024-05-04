import { type LoadSurveys } from '@/domain/usecases/survey/load-surveys.usecase'
import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys.usecase'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb/survey/survey-mongodb-repository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveys(surveyMongoDbRepository)
}
