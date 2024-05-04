import { type AddSurveyModel } from '@/domain/usecases/survey/add-survey.usecase'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
