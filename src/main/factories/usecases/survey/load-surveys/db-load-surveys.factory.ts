import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys.usecase'
import { type LoadSurveys } from '../../../../../domain/usecases/load-surveys.usecase'
import { SurveyMongoDbRepository } from '../../../../../infra/db/mongodb/survey/survey-mongodb-repository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveys(surveyMongoDbRepository)
}
