import { Request, Response, NextFunction } from "express";
import { CustomError } from "../erros/custom-error-abstract";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../erros/request-validation-error";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

export { validateRequest };
