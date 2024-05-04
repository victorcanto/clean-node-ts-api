import { type AccountModel } from '@/domain/models/account.model'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (accountData: AddAccountParams) => Promise<AccountModel | null>
}
