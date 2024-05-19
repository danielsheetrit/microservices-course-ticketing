import express from "express";

const singoutRouter = express.Router();

singoutRouter.post("api/users/singout", (req, res) => {
    req.session = null;
    res.send({});
});

export { singoutRouter };
