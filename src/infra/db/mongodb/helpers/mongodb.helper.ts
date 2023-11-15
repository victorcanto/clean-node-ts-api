import { type Collection, MongoClient } from 'mongodb'

export const MongoDbHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    try {
      this.client = await MongoClient.connect(uri)
    } catch (error) {
      console.error('Failed to connect to MongoDB', error)
    }
  },

  async disconnect (): Promise<void> {
    try {
      if (this.client) {
        await this.client.close()
      }
    } catch (error) {
      console.error('Failed to disconnect to MongoDB', error)
    }
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return { ...collectionWithoutId, id: _id }
  }
}
