"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const bankingCardController_1 = require("../controllers/bankingCardController");
const router = express_1.default.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)
router.route("/:userId").get(authController_1.protect, bankingCardController_1.getBankingCards);
router.route("/createCard").post(authController_1.protect, bankingCardController_1.createBankingCard);
router.route("/deleteCard/:id").delete(authController_1.protect, bankingCardController_1.deleteBankingCard);
exports.default = router;
