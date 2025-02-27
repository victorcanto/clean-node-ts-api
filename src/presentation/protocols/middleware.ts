import { type HttpRequest, type HttpResponse } from './http.protocol'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
