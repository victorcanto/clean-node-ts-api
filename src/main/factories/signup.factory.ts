import { DbAddAccount } from '../../data/usecases/add-account/db-add-account.usecase'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoDbRepository } from '../../infra/db/mongodb/account-repository/account-repository'
import { LogMongoDbRepository } from '../../infra/db/mongodb/log-repository/log-repository'
import { SignUpController } from '../../presentation/controllers/signup/signup.controller'
import { type Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter.util'
import { LogControllerDecorator } from '../decorators/log.decorator'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const addAccountRepository = new AccountMongoDbRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signUpController = new SignUpController(emailValidator, addAccount)
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
