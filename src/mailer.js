import nodemailer from 'nodemailer';

function setup() {
    return nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth: {
            user: process.env.MAILER_USER, // generated ethereal user
            pass: process.env.MAILER_PASSWORD // generated ethereal password
        }
    });
};

export function sendConfirmationEmail(user) {
    const transport = setup();
    const email = {
        from: '"tokocrypto" <admin@tokocrypto.com>', // sender address
        to: user.email, // list of receivers
        subject: 'WELCOME TO TOKOCRYPTO', // Subject line
        text: `Please kindly click the link below to verify your email address,
        ${user.generateConfirmationUrl()}
        `
    };
    transport.sendMail(email);
};

export function sendResetPasswordEmail(user) {
    const transport = setup();
    const email = {
        from: '"tokocrypto" <admin@tokocrypto.com>', // sender address
        to: user.email, // list of receivers
        subject: 'RESET PASSWORD', // Subject line
        text: `Please kindly click the link below to reset your password,
        ${user.generateResetPasswordLink()}
        `
    };
    transport.sendMail(email);
}