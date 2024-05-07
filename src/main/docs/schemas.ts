import {
  accountSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
  loginParamsSchema,
  signUpParamsSchema,
  errorSchema,
  surveyResultAnswerSchema
} from './schemas/'

export default {
  account: accountSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema
}
