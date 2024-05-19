import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";

const currentUserRouter = express.Router();

currentUserRouter.get(
  "/api/users/currentuser",
  currentUser,
  async (req, res) => {
    return res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { currentUserRouter };
