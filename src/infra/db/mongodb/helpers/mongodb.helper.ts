import { type Collection, MongoClient } from 'mongodb'

export const MongoDbHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    try {
      this.uri = uri
      this.client = await MongoClient.connect(uri)
    } catch (error) {
      console.error('Failed to connect to MongoDB', error)
    }
  },

  async disconnect (): Promise<void> {
    try {
      await this.client.close()
      this.client = null
    } catch (error) {
      console.error('Failed to disconnect to MongoDB', error)
    }
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return { ...collectionWithoutId, id: _id }
  }
}
