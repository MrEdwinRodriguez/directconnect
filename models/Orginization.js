const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrginizationSchema = new Schema ({
	name: { type: String, required: true},
	value: { type: String, required: true},
	founded: { type: String, required: true},
	chapters: [{ type: Schema.Types.ObjectId, ref: 'chapters' }]
});

module.exports = User = mongoose.model('orginization', OrginizationSchema);