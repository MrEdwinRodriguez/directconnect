const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
	name: { type: String, required: true},
	email: { type: String, required: true},
	password: { type: String, required: true},
	resetPasswordToken: String,
  resetPasswordExpires: Date,
	inviteCode: { type: String, required: true},
	avatar: { type: String},
	date: { type: Date, default: Date.now},

});

// UserSchema.pre('save', function(next) {
// 	var user = this;
// 	var SALT_FACTOR = 10;
  
// 	if (!user.isModified('password')) return next();
  
// 	// bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
// 	//   if (err) return next(err);
  
// 	//   bcrypt.hash(user.password, salt, null, function(err, hash) {
// 	// 	if (err) return next(err);
// 	// 	user.password = hash;
// 	// 	next();
// 	//   });
// 	// });
//   });

  module.exports = User = mongoose.model('users', UserSchema);