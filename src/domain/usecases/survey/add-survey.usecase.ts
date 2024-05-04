import type { SurveyModel } from '@/domain/models/survey.model'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add: (data: AddSurveyParams) => Promise<void>
}
