import express from "express";

const singoutRouter = express.Router();

singoutRouter.post("api/users/singout", (req, res) => {
    res.send('hi there');
});

export { singoutRouter };
