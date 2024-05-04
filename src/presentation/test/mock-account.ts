import { mockAccountModel } from '@/domain/test'
import { type AccountModel } from '@/domain/models/account.model'
import { type AddAccount, type AddAccountParams } from '@/domain/usecases/account/add-account.usecase'
import { type Authentication, type AuthenticationParams } from '@/domain/usecases/account/authentication.usecase'
import { type LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token.usecase'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
