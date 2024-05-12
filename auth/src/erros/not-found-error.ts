import { CustomError } from "./custom-error-abstract";

export class NotFoundError extends CustomError {
  public statusCode = 404;

  constructor() {
    super("[route-not-found]");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
