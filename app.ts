import express from "express";
import authRouter from "./routes/authRoutes";
import bankingCardRouter from "./routes/bankingCardRoutes";
import transactionRouter from "./routes/transactionRoutes";
import userRouter from "./routes/userRoutes";
import notificationRouter from "./routes/notificationRoutes";
import friendsRouter from "./routes/friendsRoutes";
import cors from "cors";

import morgan from "morgan";
import searchUsersRoutes from "./routes/searchUsersRoutes";

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

//middleware check valid user
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bankingCards", bankingCardRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/friends", friendsRouter);
app.use("/api/v1/searchusers", searchUsersRoutes)

export default app;
