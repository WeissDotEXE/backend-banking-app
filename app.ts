import express from "express";
import authRouter from "./routes/authRoutes";
import bankingCardRouter from "./routes/bankingCardRoutes";
import transactionRouter from "./routes/transactionRoutes";
import userRouter from "./routes/userRoutes";
import notificationRouter from "./routes/notificationRoutes";
import friendsRouter from "./routes/friendsRoutes";
import searchUsersRouter from "./routes/searchUsersRoutes";
import bankingAccountsRouter from "./routes/bankingAccountsRoutes";
import imageUploadRoutes from "./routes/imageUploadRoutes";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import generatePdfRoutes from "./routes/generatePdfRoutes";

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
// Configure body-parser to handle larger payloads
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//middleware check valid user
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bankingCards", bankingCardRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/friends", friendsRouter);
app.use("/api/v1/searchUsers", searchUsersRouter)
app.use("/api/v1/bankingAccounts", bankingAccountsRouter)
app.use("/api/v1/image", imageUploadRoutes)
app.use("/api/v1/generatePdf", generatePdfRoutes)

export default app;
