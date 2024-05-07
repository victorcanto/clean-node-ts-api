import { type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
