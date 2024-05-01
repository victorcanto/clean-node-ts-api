import { type AccountModel } from '@/domain/models/account.model'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel | null>
}
