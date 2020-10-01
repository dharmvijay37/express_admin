export class BaseError extends Error {
  public data: GlobalDataObject | undefined;

  constructor(message: string, data?: GlobalDataObject | undefined) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.data = data;
  }
}

export class CustomError extends BaseError {
}
