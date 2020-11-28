import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount", testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "zvau5cinjetyppka@ethereal.email", // generated ethereal user
      pass: "Ut1Z6JuF3Yb5k6uvPn", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"The Flynn 👻" <flynn@flynn.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
