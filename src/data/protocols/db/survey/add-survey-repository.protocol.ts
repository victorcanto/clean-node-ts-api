import { type AddSurveyModel } from '../../../../domain/usecases/add-survey.usecase'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
