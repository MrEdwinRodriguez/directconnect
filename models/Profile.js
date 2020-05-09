const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileScheme = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users' },
	handle: { type: String, required: true, max: 40 },
	profileImage: {type: String},
	company: {type: String},
	website: {type: String},
	location: {type: String},
	phoneNumber: {type: String},
	title: {type: String},
	orginization: {type: String},
	chapter: {type: String},
	status: { type: String, required: true},
	skills: { type: [String], required: true},
	bio: {type: String },
	lookingFor: {type: String },
	hiringFor: [{type: Schema.Types.ObjectId, ref: "hiringFor"}],
	githubusername: {type: String},
	experience: [
		{
			title: { type: String, required: true },
			company: { type: String, required: true },
			location: { type: String },
			from: { type: Date, required: true },
			to: { type: Date },
			current: { type: Boolean, default: false },
			description: { type: String },

		}
	],
	education: [
		{
			school: { type: String, required: true },
			degree: { type: String, required: true },
			fieldofstudy: { type: String, required: true },
			from: { type: Date, required: true },
			to: { type: Date },
			current: { type: Boolean, default: false },
			description: { type: String },

		}
	], 
	social: {
		youtube: {type: String},
		twitter: {type: String},
		facebook: {type: String},
		linkedin: {type: String},
		instagram: {type: String},
	},
	business: [
		{
			name: { type: String},
			title: { type: String},
			website: {type: String},
			location: { type: String },
			description: { type: String },
		}
	],
	date: { type: Date, default: Date.now() }
});

module.exports = Profile = mongoose.model('profile', ProfileScheme);