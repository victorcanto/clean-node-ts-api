import { type AccountModel } from '@/domain/models/account.model'
import { type AddAccountModel } from '@/domain/usecases/add-account.usecase'
import { type AddAccountRepository } from '@/data/protocols/db/account/add-account-repository.protocol'
import { type LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository.protocol'
import { type UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository.protocol'
import { type LoadAccountByTokenRepository } from '@/data/usecases/load-account-by-token/db-load-account-by-token-protocols'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers/mongodb.helper'
import { ObjectId } from 'mongodb'

export class AccountMongoDbRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
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

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoDbHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ accessToken: token, $or: [{ role }, { role: 'admin' }] })
    return account && MongoDbHelper.map(account)
  }
}
