"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.protect = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_1 = __importDefault(require("../utils/email"));
const bankingAccountModel_1 = __importDefault(require("../models/bankingAccountModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password !== req.body.repeatPassword) {
            res
                .status(400)
                .json({ status: "fail", message: "Passwords are not the same" });
            return;
        }
        const newUser = yield userModel_1.default.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword,
            passwordChangedAt: req.body.passwordChangedAt,
        });
        const token = signToken(newUser._id);
        //create 3 accounts for this user
        for (let i = 0; i < 3; i++) {
            yield bankingAccountModel_1.default.create({
                currency: i,
                userId: newUser._id
            });
        }
        res.status(201).json({ status: "success", token, data: newUser });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //1) Check if email and password exist
        if (!email || !password) {
            res.status(400).json({ status: "fail", message: "Please provide email and password" });
            return;
        }
        //2) Check if user exists && password is correct
        const user = yield userModel_1.default.findOne({ email }).select("+password");
        if (!user || !(yield user.correctPassword(password, user.password))) {
            res.status(401).json({ status: "fail", message: "Incorrect email or password" });
            return;
        }
        //3) If everything is correct, send token to client
        const token = signToken(user._id);
        res.status(200).json({
            status: "success",
            token,
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.login = login;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //1. Get the token and check if it's there
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res
                .status(401)
                .json({ status: "fail", message: "Token is not provided" });
        }
        //2. Verification
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("decode: " + decoded); //id, iat, exp-expire
        //3. Check if user still exists
        //@ts-ignore
        const currentUser = yield userModel_1.default.findById(decoded.id);
        if (!currentUser) {
            return res
                .status(400)
                .json({ status: "fail", message: "User no longer exists" });
        }
        //GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.protect = protect;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //1. Get user based on POSTed email
        const user = yield userModel_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "THere is no user with email address",
            });
        }
        //2. Generate the random token
        const resetToken = yield (user === null || user === void 0 ? void 0 : user.createPasswordResetToken());
        const response = yield (user === null || user === void 0 ? void 0 : user.save({ validateBeforeSave: false }));
        //3. send it back as an email
        const resetURL = `${process.env.FRONTEND_APP_URL}/resetPassword/${resetToken}`;
        const message = `Forgot your Password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\n If you didn't forget your password, please ignore it`;
        try {
            yield (0, email_1.default)({
                email: req.body.email,
                subject: "Your password reset token (valid for 10 mins)",
                message,
            });
        }
        catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            yield user.save({ validateBeforeSave: false });
            res.status(500).json({
                status: "fail",
                message: "there was an error sending the email. Please try again",
            });
        }
        res.status(200).json({ response });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        // 1. Get user based on the token
        const hashedToken = crypto_1.default
            .createHash('sha256')
            .update(req.params.token)
            .digest("hex");
        const user = yield userModel_1.default.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });
        // 2. If token has not expired, and there is user, set the new password
        if (!user) {
            return res.status(400).json({ status: "fail", message: "Token is invalid or has expired" });
        }
        // Hash the new password before saving it
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        yield user.save();
        // 3. Update passwordChangedAt property for the user (this should be done in user model with a pre save middleware)
        // 4. Log the user in, send JWT
        const token = signToken(user._id);
        res.status(200).json({
            status: "success",
            token,
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.resetPassword = resetPassword;
