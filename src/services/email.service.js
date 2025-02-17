const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = (to, verificationLink) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: ${verificationLink}`,
        html: `<p>Please verify your email by clicking on the following link: <a href="${verificationLink}">Verify Email</a></p>`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail,
};