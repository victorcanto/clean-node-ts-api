import { ObjectId } from 'mongodb'
import { type AddAccountRepository } from '../../../../data/protocols/db/add-account-repository.protocol'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository.protocol'
import { type UpdateAccessTokenRepository } from '../../../../data/protocols/db/update-access-token-repository.protocol'
import { type AccountModel } from '../../../../domain/models/account.model'
import { type AddAccountModel } from '../../../../domain/usecases/add-account.usecase'
import { MongoDbHelper } from '../helpers/mongodb.helper'

export class AccountMongoDbRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoDbHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, { $set: { accessToken: token } })
  }
}
