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

  test('should get a collection', async () => {
    const collectionName = 'users'
    const collection = await sut.getCollection(collectionName)

    expect(collection).toBeInstanceOf(Object)
    expect(collection.collectionName).toBe(collectionName)
  })

  test('should map documents', () => {
    const data = { _id: '123', name: 'John Doe' }
    const mappedData = sut.map(data)

    expect(mappedData).toHaveProperty('id', data._id)
    expect(mappedData).not.toHaveProperty('_id')
  })

  test('should map collections', () => {
    const data = [{ _id: '123', name: 'John Doe' }, { _id: '456', name: 'Jane Doe' }]
    const mappedData = sut.mapCollection(data)

    expect(mappedData).toHaveLength(2)
    expect(mappedData[0]).toHaveProperty('id', data[0]._id)
    expect(mappedData[1]).toHaveProperty('id', data[1]._id)
  })
})
