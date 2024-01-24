import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { type LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt/jwt-adapter'
import { AccountMongoDbRepository } from '../../../../../infra/db/mongodb/account/account-mongodb-repository'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoDbRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
