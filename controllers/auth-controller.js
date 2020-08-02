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

function getProfile(userId) {
	return new Promise(function(resolve, reject){
		Profile.findOne({user: userId}).lean().exec()
		.then(profile => {
			if(!profile) return resolve({noprofile: 'no profile found for this user.'})
			return resolve(profile)
		})	
	})
}
exports.getProfile = getProfile;