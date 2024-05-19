import express from "express";

const singoutRouter = express.Router();

singoutRouter.post("api/users/signout", (req, res) => {
    req.session = null;
    res.send({});
});

export { singoutRouter };
