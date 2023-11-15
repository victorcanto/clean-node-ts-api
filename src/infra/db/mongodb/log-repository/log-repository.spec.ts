import { type Collection } from 'mongodb'
import { type LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoDbHelper } from '../helpers/mongodb.helper'
import { LogMongoDbRepository } from './log-repository'

const makeSut = (): LogErrorRepository => {
  return new LogMongoDbRepository()
}

describe('Account Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoDbHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoDbHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoDbHelper.getCollection('errors')
    await errorCollection.deleteMany()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
