import BankingAccount from "../models/bankingAccountModel";
import {Response, Request} from "express";
import currencyEnum from "../enums/currencyEnum";

const getBankingAccounts = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const bankingAccounts = await BankingAccount.find({userId})

        res.status(200).json({status: "success", data: bankingAccounts})
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
}

export {getBankingAccounts}