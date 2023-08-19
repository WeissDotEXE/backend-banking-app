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
exports.generatePdf = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generatePdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, currency, date, amount } = req.body;
        let doc = new pdfkit_1.default();
        // Setting Content-Type to application/pdf and Content-Disposition to inline to display PDF inline in the browser
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=MyPDF.pdf');
        // Writing some text into our PDF file
        doc.text('Invoice from banking app', 50, 50);
        doc.text(`Id: ${id}`, 50, 100);
        doc.text(`Currency: ${currency}`, 50, 150);
        doc.text(`Date: ${date}`, 50, 200);
        doc.text(`Amount: ${amount}`, 50, 250);
        // Pipe the PDF data to the response object
        doc.pipe(res);
        doc.end();
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.generatePdf = generatePdf;
