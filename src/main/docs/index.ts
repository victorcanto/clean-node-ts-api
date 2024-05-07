import { badRequest, forbidden, notFound, serverError, unauthorized } from './components'
import {
  apiKeyAuthSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
  accountSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema
} from './schemas'
import { loginPath, signUpPath, surveyPath, surveyResultPath } from './paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API for Clean Node App',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [
    { name: 'Login' },
    { name: 'Enquete' }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
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
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    forbidden,
    notFound
  }
}
