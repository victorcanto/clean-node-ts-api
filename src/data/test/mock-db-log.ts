import { type LogErrorRepository } from '@/data/protocols/db/log/log-error-repository.protocol'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new LogErrorRepositoryStub()
}
