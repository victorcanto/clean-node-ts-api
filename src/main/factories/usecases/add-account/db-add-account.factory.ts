import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account.usecase'
import { type AddAccount } from '../../../../domain/usecases/add-account.usecase'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'
import { AccountMongoDbRepository } from '../../../../infra/db/mongodb/account/account-mongodb-repository'

export const makeDbAddAccount = (): AddAccount => {
  const hasher = new BcryptAdapter()
  const addAccountRepository = new AccountMongoDbRepository()
  return new DbAddAccount(hasher, addAccountRepository)
}
