import nodemailer from 'nodemailer';

export const sendContactEmail = async ({name, email, message}) => {
  // Configuration du transporteur Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER, 
    to: process.env.MAIL_TO,
    replyTo: email, 
    subject: `Contact Portfolio de ${name}`,
    text: `Message de ${name} (${email}) : ${message}`,
  };

  return await transporter.sendMail(mailOptions);
};