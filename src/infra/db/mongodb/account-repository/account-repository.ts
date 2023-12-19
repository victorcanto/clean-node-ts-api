import { type AddAccountRepository } from '../../../../data/protocols/db/add-account-repository.protocol'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository.protocol'
import { type AccountModel } from '../../../../domain/models/account.model'
import { type AddAccountModel } from '../../../../domain/usecases/add-account.usecase'
import { MongoDbHelper } from '../helpers/mongodb.helper'

export class AccountMongoDbRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoDbHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const insertedAccount = await accountCollection.findOne({ _id: insertedId })
    return MongoDbHelper.map(insertedAccount)
  };

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoDbHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoDbHelper.map(account)
  }
}
