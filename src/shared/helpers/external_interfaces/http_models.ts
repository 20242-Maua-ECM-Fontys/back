/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCodeEnum } from '../enum/http_status_code_enum'
import { IRequest, IResponse } from '../external_interfaces/external_interface'
import { Express } from 'express'

class HttpRequest implements IRequest {
  body: Record<string, any>
  headers: Record<string, any>
  query_params: Record<string, any>
  file: Express.Multer.File | null

  private _data: Record<string, any> = {}

  constructor(
    body: Record<string, any> = {},
    headers: Record<string, any> = {},
    query_params: Record<string, any> = {},
    file: Express.Multer.File | null = null, // Aqui o file pode ser null por padrão
  ) {
    this.body = body || {}
    this.headers = headers || {}
    this.query_params = query_params || {}
    this.file = file || null

    const data_json: Record<string, any> = {}

    // Verifique as chaves sobrepostas
    if (typeof body === 'object') {
      Object.assign(data_json, body)
      const overlappingKeys = Object.keys(this.body).filter(
        (key) => key in this.query_params || key in this.headers,
      )
      if (overlappingKeys.length > 0) {
        console.warn(
          `body, query_params, and/or headers have overlapping keys → ${overlappingKeys}`,
        )
      }
    } else {
      const overlappingKeys = Object.keys(this.query_params).filter(
        (key) => key in this.headers,
      )
      if (overlappingKeys.length > 0) {
        console.warn(
          `query_params and headers have overlapping keys → ${overlappingKeys}`,
        )
      }
    }

    if (typeof body === 'string') {
      Object.assign(data_json, { body })
    }

    Object.assign(data_json, this.headers, this.query_params)
    this.data = data_json
    if (file) {
      this.data.file = file
    }
  }

  get data(): Record<string, any> {
    return this._data
  }

  set data(value: Record<string, any>) {
    this._data = value
  }

  toString(): string {
    return `HttpRequest (body=${JSON.stringify(this.body)}, headers=${JSON.stringify(this.headers)}, query_params=${JSON.stringify(this.query_params)}, data=${JSON.stringify(this.data)})`
  }
}

class HttpResponse implements IResponse {
  _status_code: number
  body: Record<string, any>
  headers: Record<string, any>

  private _data: Record<string, any> = {}

  constructor(
    status_code?: number | undefined,
    body: Record<string, any> = {},
    headers: Record<string, any> = {},
  ) {
    this._status_code = status_code || HttpStatusCodeEnum.OK
    this.body = body || {}
    this.headers = headers

    const data_json: Record<string, any> = {}
    if (typeof body === 'object') {
      Object.assign(data_json, body)
    }
    if (typeof body === 'string') {
      Object.assign(data_json, { body })
    }

    Object.assign(data_json, headers)
    this.data = data_json
  }
  get statusCode(): number {
    return this._status_code || HttpStatusCodeEnum.OK
  }

  set statusCode(value: number) {
    this._status_code = value
  }

  get data(): Record<string, any> {
    return this._data
  }

  set data(value: Record<string, any>) {
    this._data = value
  }

  toString(): string {
    return `HttpResponse (status_code=${this._status_code}, body=${JSON.stringify(this.body)}, headers=${JSON.stringify(this.headers)})`
  }
}

export { HttpRequest, HttpResponse }
