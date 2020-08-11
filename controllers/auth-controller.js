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

function sanitizeUserObject(user) {
	//only returning relavent user info
	let userObject = {};
	userObject._id = user._id;
	userObject.first_name = user.first_name;
	userObject.last_name = user.last_name;
	userObject.name = user.name;
	userObject.email = user.email;
	userObject.viewed_pinned_messages = user.viewed_pinned_messages;
	userObject.is_admin = user.is_admin;
	userObject.is_org_officer = user.is_org_officer;
	userObject.email_permissions= user.email_permissions;
	return userObject
}
exports.sanitizeUserObject = sanitizeUserObject;