const nodemailer = require('nodemailer');
const mailerCredentials = require('../config/nodemailer')

function welcomeEmail(user) {
    console.log('sending welcome email')
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        service: 'gmail',
        host: 'gmail.com',
        auth: {
            user: mailerCredentials.email,
            pass: mailerCredentials.password
        },
        debug: false,
        logger: true
    });
    const welcomeMessage = 'Welcome to Blue and White connect.  The inspiration of Blue and White Directory was to better connect Sigmas and Zetas.  My hopes with this is that we become better connected professionaly, support, and mentor each other'
    const mailOptions = {
        from: '"BlueAndWhiteConnect"'+ mailerCredentials.email,
        to: user.email,
        subject: 'Welcom to Blue and White Connect',
        text: welcomeMessage,
        // replyTo: 'mredwinrodriguez@gmail.com'
    }
    console.log('sending email now to: ', user.email)
    transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
            console.error('there was an error sending the email: ', err);
        } else {
            console.log("email sent succesfull", res)
        }
    })
}
exports.welcomeEmail = welcomeEmail;

function forgotPassword (user, host) {
    return new Promise(function (resolve, reject) {
        console.log('sending forgot password email')
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            service: 'gmail',
            host: 'gmail.com',
            auth: {
                user: mailerCredentials.email,
                pass: mailerCredentials.password
            },
            debug: false,
            logger: true
        });
        console.log('break')
        console.log(user.resetPasswordToken)
        const emailBody = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + host + '/reset/' + user.resetPasswordToken + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n';

        const mailOptions = {
            from: '"BlueAndWhiteConnect"'+ mailerCredentials.email,
            to: user.email,
            subject: 'Welcom to Blue and White Connect',
            text:  emailBody,
        }
        console.log('sending email now to: ', user.email)
        transporter.sendMail(mailOptions, function(err, res) {
            console.log('sent')
            if (err) {
                return reject(err);
            } else {
                return resolve({'success': 'Reset passwork email has been sent'})
            }
        })
    })
}

exports.forgotPassword = forgotPassword;