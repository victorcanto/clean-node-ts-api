import { LoginController } from '@/presentation/controllers/login/login/login.controller'
import { type Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication.factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { makeLoginValidation } from './login-validation.factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
