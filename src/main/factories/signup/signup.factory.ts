import env from '../../config/env'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account.usecase'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt-adapter'
import { AccountMongoDbRepository } from '../../../infra/db/mongodb/account/account-mongodb-repository'
import { LogMongoDbRepository } from '../../../infra/db/mongodb/log/log-mongodb-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup.controller'
import { type Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller/log-controller.decorator'
import { makeSignUpValidation } from './signup-validation.factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication.usecase'

export const makeSignUpController = (): Controller => {
  const hasher = new BcryptAdapter()
  const addAccountRepository = new AccountMongoDbRepository()
  const addAccount = new DbAddAccount(hasher, addAccountRepository)
  const hashComparer = new BcryptAdapter()
  const encrypter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountMongoDbRepository()
  const authentication = new DbAuthentication(accountRepository, hashComparer, encrypter, accountRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation(), authentication)
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
