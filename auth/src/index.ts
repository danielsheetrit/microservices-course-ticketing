import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { json } from "body-parser";

import { connect } from "./db/mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { singupRouter } from "./routes/signup";
import { singoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./erros/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(singupRouter);
app.use(signinRouter);
app.use(singoutRouter);

app.use("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

// connec to mongoDB and start the app
connect(app);
