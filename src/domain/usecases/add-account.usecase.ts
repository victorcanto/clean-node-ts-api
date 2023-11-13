import { type AccountModel } from '../models/account.model'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
