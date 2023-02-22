import express, { json, NextFunction } from "express";
import authRouter from "./routes/authRoutes";
import bankingCardRouter from "./routes/bankingCardRoutes";
import transactionRouter from "./routes/transactionRoutes";
import userRouter from "./routes/userRoutes";
import notificationRouter from "./routes/notificationRoutes";
import cors from "cors";

import path from "path";
import morgan from "morgan";

const app = express();
app.use(cors());
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
app.use("/api/v1/notification", notificationRouter);

export default app;
