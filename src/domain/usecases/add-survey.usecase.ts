import type { SurveyAnswerModel } from '@/domain/models/survey.model'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
