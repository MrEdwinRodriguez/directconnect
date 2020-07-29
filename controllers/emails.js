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
    const welcomeMessage = 'Welcome to Blue and White connect.  The inspiration of Blue and White Directory was to better connect Sigmas and Zetas.  My hope with this is that we become better connected professionaly, create more mentor/mentee relationships, promote Blue and White businesses, and Promote content creators (Blogs, Podcast, YouTube Channels) '
    const mailOptions = {
        from: '"BlueAndWhiteConnect"'+ mailerCredentials.email,
        to: user.email,
        subject: 'Welcom to Blue and White Connect',
        text: welcomeMessage,
        html: '<p>'+user.first_name+',</p><p>Welcome to Blue and White Connect.  Blue and Whtie Connect was intended to be a directory to better connect Zetas and Sigmas. The goals of Blue and White Connect are:</p><ul><li>Connect us better professionally.</li><li>Create more Mentor/Mentee relationships.</li><li>Promote Blue and White Businesses.</li><li>Promote content creators (Blogs, Podcast, YouTube Channels)</li></ul> <p>Blue and White Connect is currently only available for the Orlando chapters of Zeta Phi Beta Sorority Incorporated and Phi Beta Sigma Fraternity Incorporated. But I am hoping to expand it through Florida and hopefully even on a national level.</p><p>Please be on the lookout for future update. If you have any issues, concerns or suggestions, please email me at mredwinrodriguez@gmail.com.</p><p>Sincerely,</p><br><p>Edwin Rodriguez</p>'
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
            subject: 'Forgot Password',
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

function passwordReset (user) {
    return new Promise(function (resolve, reject) {
        console.log('sending password reset email')
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
        const emailBody = 'Your password has been reset';

        const mailOptions = {
            from: '"BlueAndWhiteConnect"'+ mailerCredentials.email,
            to: user.email,
            subject: 'Password has been reset',
            text:  emailBody,
        }
        console.log('sending email now to: ', user.email)
        transporter.sendMail(mailOptions, function(err, res) {
            console.log('sent')
            if (err) {
                return reject(err);
            } else {
                return resolve({'success': 'Password has been reset'})
            }
        })
    })
}

exports.passwordReset = passwordReset;