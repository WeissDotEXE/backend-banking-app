import mongoose, {Schema} from "mongoose";
import currencyEnum from "../enums/currencyEnum";

interface BankingAccountDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    balance: number;
    currency: currencyEnum
}

const bankingAccountSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "BankingAccount must have a userId"]
        },
        balance: {
            type: Number,
            default: 0
        },
        currency: {
            type: Number,
            required: [true, "BankingAccount must have a currency"]
        }
    }
)

const BankingAccount = mongoose.model<BankingAccountDocument>("BankingAccount", bankingAccountSchema);
export default BankingAccount;