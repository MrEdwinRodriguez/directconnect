const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileScheme = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users' },
	handle: { type: String, required: true, max: 40 },
	profileImage: {type: String},
	company: {type: String},
	website: {type: String},
	hasBlog: { type: Boolean, default: false },
	blog: {
		name: {type: String},
		about: {type: String},
		link: {type: String},
	},
	hasPodcast: { type: Boolean, default: false },
	podcast: {
		name: {type: String},
		about: {type: String},
		link: {type: String},
	},
	location: {type: String},
	phoneNumber: {type: String},
	title: {type: String},
	orginization: {type: String},
	chapter: {type: String},
	myChapters: [{type: String}],
	status: { type: String, required: true},
	skills: { type: [String]},
	bio: {type: String },
	lookingFor: {type: String },
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
	date: { type: Date, default: Date.now() }
});

module.exports = Profile = mongoose.model('profile', ProfileScheme);