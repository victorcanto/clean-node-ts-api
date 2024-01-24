import { type Controller } from '../../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validaton.factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator.factory'
import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-survey.factory'
import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey.controller'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
