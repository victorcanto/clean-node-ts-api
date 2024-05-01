import { type SurveyResultModel } from '@/domain/models/survey-result.model'
import { type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result.usecase'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
