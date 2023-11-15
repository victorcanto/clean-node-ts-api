import { MongoDbHelper as sut } from './mongodb.helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountColletion = await sut.getCollection('accounts')
    expect(accountColletion).toBeTruthy()
    await sut.disconnect()
    accountColletion = await sut.getCollection('accounts')
    expect(accountColletion).toBeTruthy()
  })
})
