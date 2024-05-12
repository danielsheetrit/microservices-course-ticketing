import { CustomError } from "./custom-error-abstract";
import { ValidationError } from "express-validator";

type NewErrorType = {
  message: string;
  field?: string;
};

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("[default-error-message]: Validation-Error"); // super is calling the constructor of it's parent class

    // because we extands built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      const newError: NewErrorType = {
        message: error.msg,
      };

      if (error.type === "field") {
        newError.field = error.path;
      }

      return newError;
    });
  }
}
