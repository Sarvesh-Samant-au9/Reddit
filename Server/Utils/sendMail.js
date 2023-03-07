const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "SendinBlue",
    auth: {
      pass: process.env.MAIL_PASSWORD,
      user: process.env.MAIL_SEND,
    },
  });
  const { to, subject, html } = options;
  await transporter.sendMail({
    from: `${process.env.MAIL_SEND}`,
    to,
    subject,
    html,
  });
};
module.exports = sendEmail;
