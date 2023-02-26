const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create transport (service that will send email like "gmail")
  const tranporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: 'Roshetet 3elag App <roshetet3elag@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) Send email
  await tranporter.sendMail(mailOpts);
};

module.exports = sendEmail;
