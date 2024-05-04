import { type Controller, type HttpResponse, type HttpRequest, type LoadSurveyById } from './save-survey-result-controller-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return ok(survey)
    } catch (error) {
      return serverError(error)
    }
  }
}
