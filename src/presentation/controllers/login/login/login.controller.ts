import { badRequest, ok, serverError, unauthorized } from '../../../helpers'
import { type HttpResponse, type Controller, type HttpRequest, type Authentication, type Validation } from './login-protocols'

export class LoginController implements Controller {
  constructor (private readonly validation: Validation, private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
