const nodemailer = require('nodemailer');
const mailerCredentials = require('../config/nodemailer')

function welcomeEmail(user) {
    console.log('sending welcome email')
    const transporter = nodemailer.createTransport({
        // sendmail: true, 
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        service: 'gmail',
        // requireTLS: true,
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