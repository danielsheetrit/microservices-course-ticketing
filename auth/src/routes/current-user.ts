import express from "express";
import jwt from "jsonwebtoken";

const currentUserRouter = express.Router();

currentUserRouter.get("/api/users/currentuser", async (req, res) => {
  if (!req.session?.jwt) {
    return res.status(200).send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.status(200).send({ currentUser: payload });
  } catch (err) {
    res.status(200).send({ currentUser: null });
  }
});

export { currentUserRouter };
