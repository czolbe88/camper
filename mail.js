const nodemailer = require('nodemailer');

require('dotenv').config();

exports.sendEmail = function sendEmail(storeName, mailingList) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: '"Camper 👻" <ps5@camper.com>', // sender address
        to: mailingList, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hi, perhaps you are interested to know that ps5 is now available at " + storeName, // plain text body
        html: "Hi, perhaps you are interested to know that ps5 is now available at " + storeName // html body
    }, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });

}