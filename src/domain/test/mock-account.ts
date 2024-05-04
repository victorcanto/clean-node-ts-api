import { type AccountModel } from '@/domain/models/account.model'
import { type AddAccountParams } from '@/domain/usecases/account/add-account.usecase'
import { type AuthenticationParams } from '@/domain/usecases/account/authentication.usecase'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddAccountParamsWithToken = (): AddAccountParams & {
  accessToken: string
} => Object.assign({}, mockAddAccountParams(), {
  accessToken: 'any_token'
})

export const mockAddAccountParamsWithTokenAndRole = (): AddAccountParams & {
  accessToken: string
  role: string
} => Object.assign({}, mockAddAccountParamsWithToken(), { role: 'admin' })

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), {
  id: 'any_id',
  password: 'hashed_password'
})

console.log(mockAccountModel())

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
