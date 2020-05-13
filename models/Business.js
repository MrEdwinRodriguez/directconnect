const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String},
    title: { type: String},
    website: {type: String},
    location: { type: String },
    description: { type: String },
    created_on: {type: Date},
    updated_on: {type: Date},
});

module.exports = Business = mongoose.model('business', BusinessSchema);
