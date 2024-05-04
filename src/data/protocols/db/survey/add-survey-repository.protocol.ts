import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey.usecase'

export interface AddSurveyRepository {
  add: (data: AddSurveyParams) => Promise<void>
}
