"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transactionEnum;
(function (transactionEnum) {
    transactionEnum[transactionEnum["userTransaction"] = 0] = "userTransaction";
    transactionEnum[transactionEnum["deposit"] = 1] = "deposit";
})(transactionEnum || (transactionEnum = {}));
exports.default = transactionEnum;
