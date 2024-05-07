import { type LogErrorRepository } from '@/data/protocols/db/log/log-error-repository.protocol'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers'
import { LogMongoDbRepository } from './log-mongodb-repository'
import { type Collection } from 'mongodb'

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
