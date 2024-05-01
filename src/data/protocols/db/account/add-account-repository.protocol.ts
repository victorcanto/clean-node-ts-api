import { type AccountModel } from '@/domain/models/account.model'
import { type AddAccountModel } from '@/domain/usecases/add-account.usecase'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
