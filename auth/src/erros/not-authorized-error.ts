import { CustomError } from "./custom-error-abstract";

export class NotAuthorizedError extends CustomError {
    public statusCode = 401;
  
    constructor() {
      super("[Not Authorized]");
  
      Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
  
    serializeErrors() {
      return [{ message: "Not Authorized" }];
    }
  }
  