import mongoose, {Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateRandomIban from "../utils/generateRandomIban";

interface UserDocument extends Document {
    id: mongoose.Schema.Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    repeatPassword: string;
    passwordChangedAt: Date;
    passwordResetToken: string | undefined;
    passwordResetExpires: Date | undefined;
    avatarImg: string;
    iban: string;
    joinDate: number;
    role: string;
    friends: {
        friendId: mongoose.Schema.Types.ObjectId;
        status: "pending" | "accepted";
    }[];
    bankingAccounts: {
        id: String
    }[];

    correctPassword(candidatePassword: string, userPassword: string): boolean;

    changedPasswordAfter(JWTTimestamp: number): boolean;

    createPasswordResetToken(): any;
}

//todo function for generating iban and setting it as default in userSchema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "User must have a fullName"],
    },
    email: {
        type: String,
        required: [true, "User must have an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "user must have an password"],
        minlength: 6,
        //for not returning it in response
        select: false,
    },
    repeatPassword: {
        type: String
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    avatarImg: {
        type: String,
        default: "http://localhost:8000/uploads/default.jpg",
    },
    iban: {
        type: String,
        length: 16,
        default: generateRandomIban
    },
    joinDate: {
        type: Date,
        default: Date.now(),
    },
    bankingAccounts: [{
        type: Schema.Types.ObjectId,
        ref: "BankingAccount",
    }]
});

userSchema.pre("save", function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    //@ts-ignore
    this.passwordChangedAt = Date.now() - 1000;
    next();
})

//between getting the data and saving it
userSchema.pre("save", async function (next) {
    // Only run this function if password was modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //delete repeatPassword field
    // @ts-ignore
    this.repeatPassword = undefined;
    next();
});

// compare password provided by user
// with hashed password in db
userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(String(this.passwordChangedAt.getTime()), 10);
        console.log(changedTimeStamp, JWTTimestamp);
        return JWTTimestamp < changedTimeStamp;
    }
    // False means NOT changed
    return false;
};


userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    console.log({resetToken}, this.passwordResetToken);

    //reset in 10 minutes formula
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({resetToken}, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
