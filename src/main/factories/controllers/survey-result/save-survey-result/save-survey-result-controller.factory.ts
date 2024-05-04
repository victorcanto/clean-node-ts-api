import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result.factory'
import { makeLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id.factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result.controler'
import { type Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
