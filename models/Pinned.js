const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinnedSchema = new Schema ({
	title: { type: String, required: true},
    subTitle: { type: String },
    viewed_by: { type: [String]},
    is_archived: { type: Boolean, required: true, default: false},
	body: { type: String, required: true},
    date: { type: Date, default: Date.now},
    expire: { type: Date},

});

  module.exports = Pinned = mongoose.model('pinned', PinnedSchema);