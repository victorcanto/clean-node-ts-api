import { type LogErrorRepository } from '../../../../data/protocols/db/log-error-repository.protocol'
import { MongoDbHelper } from '../helpers/mongodb.helper'

export class LogMongoDbRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoDbHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      data: new Date()
    })
  };
}
