if(process.env.NODE_ENV === 'production') {
	module.exports = require('./nodemailer_prod')
} else {
	module.exports = require('./nodemailer_dev')
}