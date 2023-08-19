"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bankingCardRoutes_1 = __importDefault(require("./routes/bankingCardRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const friendsRoutes_1 = __importDefault(require("./routes/friendsRoutes"));
const searchUsersRoutes_1 = __importDefault(require("./routes/searchUsersRoutes"));
const bankingAccountsRoutes_1 = __importDefault(require("./routes/bankingAccountsRoutes"));
const imageUploadRoutes_1 = __importDefault(require("./routes/imageUploadRoutes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const generatePdfRoutes_1 = __importDefault(require("./routes/generatePdfRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
//middleware - modify the incoming request data
//this middleware is used to get data from a post request and
//transform it in a js object
app.use((0, morgan_1.default)("dev")); //
app.use(express_1.default.json());
// Configure body-parser to handle larger payloads
app.use(body_parser_1.default.json({ limit: '1000mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '1000mb', extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
//middleware check valid user
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/bankingCards", bankingCardRoutes_1.default);
app.use("/api/v1/transaction", transactionRoutes_1.default);
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/notification", notificationRoutes_1.default);
app.use("/api/v1/friends", friendsRoutes_1.default);
app.use("/api/v1/searchUsers", searchUsersRoutes_1.default);
app.use("/api/v1/bankingAccounts", bankingAccountsRoutes_1.default);
app.use("/api/v1/image", imageUploadRoutes_1.default);
app.use("/api/v1/generatePdf", generatePdfRoutes_1.default);
exports.default = app;
