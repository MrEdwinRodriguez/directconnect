const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostScheme = new Schema ({
	user: { type: Schema.Types.ObjectId, ref: 'users'},
	text: { type: String, required: true },
	name: {type: String },
	avatar: { type: String },
	likes: [{ user: { type: Schema.Types.ObjectId, ref: 'users'} }],
	comments: [
		{ 
			user: { type: Schema.Types.ObjectId, ref: 'users'},
			text: {type: String, required: true},
			name: {type: String },
			avatar: { type: String }, 
			date: { type: Date, default: Date.now },
			updated: { type: Date }
		}
		],
	date: { type: Date, default: Date.now },
	updated: { type: Date }
})

module.exports = Post = mongoose.model('post', PostScheme);