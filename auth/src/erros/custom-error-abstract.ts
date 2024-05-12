type ErrorObjectType = {
  message: string;
  field?: string;
};

// we cannot create an instance of abstract class!
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): ErrorObjectType[];
}
