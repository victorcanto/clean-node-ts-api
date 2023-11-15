import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AccountModel } from '../../../../domain/models/account.model'
import { type AddAccountModel } from '../../../../domain/usecases/add-account.usecase'
import { MongoDbHelper } from '../helpers/mongodb.helper'

export class AccountMongoDbRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoDbHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const insertedAccount = await accountCollection.findOne({ _id: insertedId })
    return MongoDbHelper.map(insertedAccount)
  };
}
