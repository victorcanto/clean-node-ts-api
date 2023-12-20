import env from '../../../config/env'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt/jwt-adapter'
import { AccountMongoDbRepository } from '../../../../infra/db/mongodb/account/account-mongodb-repository'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication.usecase'
import { type Authentication } from '../../../../domain/usecases/authentication.usecase'

export const makeDbAuthentication = (): Authentication => {
  const hashComparer = new BcryptAdapter()
  const encrypter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountMongoDbRepository()
  return new DbAuthentication(accountRepository, hashComparer, encrypter, accountRepository)
}
