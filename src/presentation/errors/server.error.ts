export class ServerError extends Error {
  constructor (stask?: string) {
    super('Internal server error')
    this.name = 'ServerError'
    if (stask) {
      this.stack = stask
    }
  }
}
