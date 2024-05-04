import { type AccountModel } from '@/domain/models/account.model'
import { type AddAccountParams } from '@/domain/usecases/account/add-account.usecase'

export interface AddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
