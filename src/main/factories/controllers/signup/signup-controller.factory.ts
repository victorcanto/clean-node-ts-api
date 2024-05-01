import { SignUpController } from '@/presentation/controllers/login/signup/signup.controller'
import { type Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication.factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account.factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator.factory'
import { makeSignUpValidation } from './signup-validation.factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
