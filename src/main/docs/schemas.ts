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
  errorSchema
} from './schemas/'

export default {
  account: accountSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema
}
