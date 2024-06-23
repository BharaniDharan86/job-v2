import nodemailer from "nodemailer";

export async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.to,
    subject: `${options.subject}-Job Hunt`,
    html: `<p>Hello ${options.userName}👋, Please use this OTP - <b>${options.otp}</b> to verify your account.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
