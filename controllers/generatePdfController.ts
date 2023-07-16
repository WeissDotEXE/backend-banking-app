import {Request, Response} from "express";
import PDFDocument from "pdfkit";

const generatePdf = async (req: Request, res: Response) => {
    try {
        const {id, currency, date, amount} = req.body

        let doc = new PDFDocument();

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
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
}

export {generatePdf}