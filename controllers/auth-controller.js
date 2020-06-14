var crypto = require('crypto');

function getToken(){	
	return new Promise((resolve, reject) => {
		crypto.randomBytes(20, function(err, buf) {
			var token = buf.toString('hex');
			return resolve(token);
		});
	});
} 

exports.getToken = getToken;