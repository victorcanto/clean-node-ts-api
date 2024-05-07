import { type SaveSurveyResult, type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'
import { type LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result.usecase'
import { type SurveyResultModel } from '@/domain/models/survey-result.model'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}
