const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
	first_name: { type: String, required: true},
	last_name: { type: String, required: true},
	name: { type: String, required: true},
	email: { type: String, required: true},
	password: { type: String, required: true},
	resetPasswordToken: String,
  resetPasswordExpires: Date,
	inviteCode: { type: String, required: true},
	avatar: { type: String},
	viewed_pinned_messages: [{ type: Schema.Types.ObjectId, ref: 'pinned'}],
	date: { type: Date, default: Date.now},

});

  module.exports = User = mongoose.model('users', UserSchema);