import nodemailer from "nodemailer";
import { OptionalOptions } from "nodemailer/lib/dkim";

const sendEmail = async (options: any) => {
  try {
    //1. create a transporter
    const transporter = nodemailer.createTransport({
      //@ts-ignore
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Activate in gmail "less secure app" option
    });

    //2. Define the email options
    const mailOptions = {
      from: "Banking App <bankingapp@mihnea.io>",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    //3. Actually send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;