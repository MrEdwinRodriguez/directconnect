const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapterSchema = new Schema ({
    orginization: { type: Schema.Types.ObjectId, ref: 'orginization' },
	name: { type: String, required: true},
	value: { type: String, required: true},
    chartered: { type: String, required: true},
    level: { type: String, required: true},
    invite_code: { type: String, required: true},
});

module.exports = User = mongoose.model('chapter', ChapterSchema);