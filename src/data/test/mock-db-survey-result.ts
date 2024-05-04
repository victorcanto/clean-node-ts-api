import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository.protocol'
import { type SurveyResultModel } from '@/domain/models/survey-result.model'
import { mockSurveyResultModel } from '@/domain/test'
import { type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
