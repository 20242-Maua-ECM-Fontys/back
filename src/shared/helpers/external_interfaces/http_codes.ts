/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCodeEnum } from '../enum/http_status_code_enum'
import { HttpResponse } from '../external_interfaces/http_models'

class OK extends HttpResponse {
  constructor(body: any = null) {
    super(HttpStatusCodeEnum.OK, body)
  }
}

class Created extends HttpResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(body: any = null) {
    super(HttpStatusCodeEnum.CREATED, body)
  }
}

class NoContent extends HttpResponse {
  constructor() {
    super(HttpStatusCodeEnum.NO_CONTENT, undefined)
  }
}

class BadRequest extends HttpResponse {
  constructor(body: any) {
    super(HttpStatusCodeEnum.BAD_REQUEST, body)
  }
}

class InternalServerError extends HttpResponse {
  constructor(body: any) {
    super(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR, body)
  }
}

class NotFound extends HttpResponse {
  constructor(body: any) {
    super(HttpStatusCodeEnum.NOT_FOUND, body)
  }
}

class Conflict extends HttpResponse {
  constructor(body: any) {
    super(HttpStatusCodeEnum.CONFLICT, body)
  }
}

class RedirectResponse extends HttpResponse {
  location: object

  constructor(body: object) {
    super(HttpStatusCodeEnum.REDIRECT, undefined)
    this.location = body
  }
}

class Forbidden extends HttpResponse {
  constructor(body: object) {
    super(HttpStatusCodeEnum.FORBIDDEN, body)
  }
}


export {
  OK,
  Created,
  NoContent,
  BadRequest,
  InternalServerError,
  NotFound,
  Conflict,
  RedirectResponse,
  Forbidden
}