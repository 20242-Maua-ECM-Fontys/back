abstract class IRequest {
  abstract get data(): Record<string, unknown>;
}

abstract class IResponse {
  abstract get statusCode(): number;
  abstract get data(): Record<string, unknown>;
}

export { IRequest, IResponse }