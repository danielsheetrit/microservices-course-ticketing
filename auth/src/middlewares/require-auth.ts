import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../erros/not-authorized-error";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};

export { requireAuth };
