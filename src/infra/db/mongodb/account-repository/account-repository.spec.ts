/* eslint-disable @typescript-eslint/no-unused-vars */
import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { MongoDbHelper } from '../helpers/mongodb.helper'
import { AccountMongoDbRepository } from './account-repository'

const makeSut = (): AddAccountRepository => {
  return new AccountMongoDbRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoDbHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoDbHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
