import {
  type SaveSurveyResultParams,
  type SaveSurveyResult,
  type SaveSurveyResultRepository,
  type SurveyResultModel,
  type LoadSurveyResultRepository,
  type LoadSurveyResult
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult, LoadSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.load(data.surveyId)
    return surveyResult
  }

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return surveyResult
  }
}
