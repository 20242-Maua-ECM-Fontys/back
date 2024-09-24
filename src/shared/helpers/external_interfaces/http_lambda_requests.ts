/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, HttpResponse } from '../external_interfaces/http_models'

class LambdaHttpResponse extends HttpResponse {
  constructor(body: any, status_code: number | undefined, headers: Record<string, any> | undefined , kwargs: Record<string, any> = {}) {
    const _body = body || {}
    const _status_code = status_code || 200
    const _headers = headers || {}
    
    _headers['Access-Control-Allow-Origin'] = '*'
    
    
    if (kwargs.add_default_cors_headers !== false) {
      _headers['Access-Control-Allow-Origin'] = '*'
    }
    
    super(_status_code, _body, _headers)
  }

  toJSON(): Record<string, any> {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.body),
      headers: this.headers,
      isBase64Encoded: false,
    }
  }


  toString(): string {
    return `LambdaHttpResponse (status_code=${this.statusCode}, body=${JSON.stringify(this.body)}, headers=${JSON.stringify(this.headers)})`
  }
}

class LambdaDefaultHTTP {
  method: string = ''
  path: string = ''
  protocol: string = ''
  source_ip: string = ''
  user_agent: string = ''

  constructor(data: Record<string, any> = {}) {
    this.method = data.method || ''
    this.path = data.path || ''
    this.protocol = data.protocol || ''
    this.source_ip = data.sourceIp || ''
    this.user_agent = data.userAgent || ''
  }

  equals(other: LambdaDefaultHTTP): boolean {
    return (
      this.method === other.method &&
      this.path === other.path &&
      this.protocol === other.protocol &&
      this.source_ip === other.source_ip &&
      this.user_agent === other.user_agent
    )
  }
}

class LambdaHttpRequest extends HttpRequest {
  version: string
  raw_path: string
  raw_query_string: string
  headers: Record<string, any> = {}
  query_string_parameters: Record<string, any>
  request_context: Record<string, any>
  http: LambdaDefaultHTTP
  body: any

  constructor(data: Record<string, any> = {}) {
    const _headers = data.headers
    const _query_string_parameters = data.queryStringParameters
    let _body: any = null

    if ('body' in data) {
      try {
        _body = JSON.parse(data.body)
      } catch {
        _body = data.body
      }
    }

    super(_body, _headers, _query_string_parameters)

    this.version = data.version
    this.raw_path = data.rawPath
    this.raw_query_string = data.rawQueryString
    this.query_string_parameters = data.queryStringParameters
    this.request_context = data.requestContext
    this.http = new LambdaDefaultHTTP(this.request_context.external_interfaces)
  }
}

class HttpResponseRedirect extends HttpResponse {
  constructor(location: string) {
    super(302, { Location: location })
  }
}

export { LambdaHttpResponse, LambdaHttpRequest, HttpResponseRedirect }