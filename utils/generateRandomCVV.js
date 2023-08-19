"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateRandomCVV = () => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return Number(result);
};
exports.default = generateRandomCVV;
