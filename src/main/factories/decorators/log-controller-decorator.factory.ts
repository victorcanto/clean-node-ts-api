import { LogMongoDbRepository } from '@/infra/db/mongodb/log/log-mongodb-repository'
import { type Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller/log-controller.decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogMongoDbRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
