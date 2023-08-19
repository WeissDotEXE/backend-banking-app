"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateCardExpireDate = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear() + 5, currentDate.getMonth(), currentDate.getDate());
};
exports.default = generateCardExpireDate;
