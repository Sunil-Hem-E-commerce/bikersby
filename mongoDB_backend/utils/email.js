const config = require("../utils/config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, token) => {
  const origin =
    config.FRONTEND_ORIGIN ||
    (process.env.NODE_ENV === "production"
      ? "https://your-domain.com"
      : "http://localhost:5173");
  const verificationLink = `${origin}/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Email Verification for Healthy Living",
    html: `<p>Please click the following link to verify your email address:</p><a href="${verificationLink}">${verificationLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
