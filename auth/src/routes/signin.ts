import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/User";
import { BadRequestError } from "../erros/bad-request-error";
import { Password } from "../services/password";

const signinRouter = express.Router();

signinRouter.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be supplied"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials supplied");
    }

    const passwordsMatch = Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials supplied");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(201).json(existingUser);
  }
);

export { signinRouter };
