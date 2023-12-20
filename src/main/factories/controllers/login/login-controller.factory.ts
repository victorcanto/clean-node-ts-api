import { LoginController } from '../../../../presentation/controllers/login/login.controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation.factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication.factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator.factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
