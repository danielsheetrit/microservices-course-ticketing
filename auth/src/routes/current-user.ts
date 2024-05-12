import express from "express";

const currentUserRouter = express.Router();

currentUserRouter.get("/api/users/currentuser", (req, res) => {
    res.send('hi there madafaka');
});

export { currentUserRouter };
