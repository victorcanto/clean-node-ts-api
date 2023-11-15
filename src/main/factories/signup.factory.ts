import { DbAddAccount } from '../../data/usecases/add-account/db-add-account.usecase'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoDbRepository } from '../../infra/db/mongodb/account-repository/account.repository'
import { SignUpController } from '../../presentation/controllers/signup/signup.controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter.util'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const addAccountRepository = new AccountMongoDbRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
