import { mockAccountModel } from '@/domain/test'
import { type LoadAccountByEmailRepository, type AccountModel, type AddAccountParams } from '@/data/usecases/account/add-account/db-add-account-protocols'
import { type AddAccountRepository } from '@/data/protocols/db/account/add-account-repository.protocol'
import { type UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository.protocol'
import { type LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository.protocol'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      await Promise.resolve()
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
