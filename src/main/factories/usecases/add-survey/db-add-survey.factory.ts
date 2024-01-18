import { DbAddSurvey } from '../../../../data/usecases/add-survey/db-add-survey.usecase'
import { type AddSurvey } from '../../../../domain/usecases/add-survey.usecase'
import { SurveyMongoDbRepository } from '../../../../infra/db/mongodb/survey/survey-mongodb-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const addSurveyRepository = new SurveyMongoDbRepository()
  return new DbAddSurvey(addSurveyRepository)
}
