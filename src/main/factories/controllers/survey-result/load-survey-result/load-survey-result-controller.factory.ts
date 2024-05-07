import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/load-survey-result/db-load-survey-result.factory'
import { makeLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id.factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result.controler'
import { type Controller } from '@/presentation/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
