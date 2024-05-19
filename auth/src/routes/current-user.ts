import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const currentUserRouter = express.Router();

currentUserRouter.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  async (req, res) => {
    return res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { currentUserRouter };
