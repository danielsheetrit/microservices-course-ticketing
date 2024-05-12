import { CustomError } from "./custom-error-abstract";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message); // super is calling the constructor of it's parent class
    
    // because we extands built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
