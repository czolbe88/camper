const nodemailer = require('nodemailer');

require('dotenv').config();

exports.sendEmail = function sendEmail(mailingList, message) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: process.env.EMAIL_USERNAME, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: '"Camper 👻" <ps5@camper.com>', // sender address
            to: mailingList, // list of receivers
            subject: "Hello ✔", // Subject line
            text: message,
            html: message,
        }, (err, info) => {
            if (err) {
                console.log(err);
                reject(false)
                return;
            }
            console.log("sending email: ", info);
            resolve(true)
        })
    })

}