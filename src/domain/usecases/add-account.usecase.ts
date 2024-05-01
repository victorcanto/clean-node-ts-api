import { type AccountModel } from '@/domain/models/account.model'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel | null>
}
