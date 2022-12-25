import express, { json, NextFunction } from "express";
import authRouter from "./routes/authRoutes";
import bankingCardRouter from "./routes/bankingCardRoutes";
import transactionRouter from "./routes/transactionRoutes";
import userRouter from "./routes/userRoutes";

import path from "path";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//middleware - modify the incoming request data
//this middleware is used to get data from a post request and
//transform it in a js object
app.use(morgan("dev")); //
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bankingCards", bankingCardRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/user", userRouter);

export default app;
