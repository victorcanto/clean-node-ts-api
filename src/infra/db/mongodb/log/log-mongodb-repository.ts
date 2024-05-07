import { type LogErrorRepository } from '@/data/protocols/db/log/log-error-repository.protocol'
import { MongoDbHelper } from '@/infra/db/mongodb/helpers'

export class LogMongoDbRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoDbHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      data: new Date()
    })
  };
}
