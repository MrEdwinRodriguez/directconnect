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
	chapter: [{ type: Schema.Types.ObjectId, ref: 'chapters' }],
	orginization: { type: Schema.Types.ObjectId, ref: 'orginizations' },
	inviteCode: { type: String, required: true},
	avatar: { type: String},
	viewed_pinned_messages: [{ type: Schema.Types.ObjectId, ref: 'pinned'}],
	date: { type: Date, default: Date.now},
	email_permissions : {
		commentNotification : { type: Boolean, required: true, default: true},
		chapterNotification: { type: Boolean, required: true, default: true},
		linkedChapterNotification: { type: Boolean, required: true, default: true},
		localChaptersNotification : { type: Boolean, required: true, default: true},
		fullNetworkNotification: { type: Boolean, required: true, default: true},
	},
	last_login: { type: Date, default: Date.now},
	is_admin: { type: Boolean, default: false},
	is_org_officer: { type: Boolean, default: false},

});

  module.exports = User = mongoose.model('users', UserSchema);