import { type AccountModel } from '../add-account/db-add-account-protocols'
import { type LoadAccountByTokenRepository, type Decrypter, type LoadAccountByToken } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (accessToken) {
      await this.loadAccountByTokenRepository.loadByToken(token, role)
    }
    return null
  };
}
