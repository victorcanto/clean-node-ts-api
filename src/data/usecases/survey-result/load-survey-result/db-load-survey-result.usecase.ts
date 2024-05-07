import { type LoadSurveyResult, type LoadSurveyResultRepository, type SurveyResultModel } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    const result = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return result
  }
}
