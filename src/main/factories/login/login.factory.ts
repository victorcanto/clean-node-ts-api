import env from '../../config/env'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt-adapter'
import { AccountMongoDbRepository } from '../../../infra/db/mongodb/account/account-mongodb-repository'
import { LogMongoDbRepository } from '../../../infra/db/mongodb/log/log-mongodb-repository'
import { LoginController } from '../../../presentation/controllers/login/login.controller'
import { type Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller/log-controller.decorator'
import { makeLoginValidation } from './login-validation.factory'

export const makeLoginController = (): Controller => {
  const validation = makeLoginValidation()
  const hashComparer = new BcryptAdapter()
  const encrypter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountMongoDbRepository()
  const authentication = new DbAuthentication(accountRepository, hashComparer, encrypter, accountRepository)
  const loginController = new LoginController(validation, authentication)
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
