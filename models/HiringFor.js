const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HiringForSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    company: { type: String},
    position: { type: String },
    location: { type: String },
    pay: { type: String },
    frequency: { type: String },
    description: { type: String },
});

module.exports = HiringFor = mongoose.model('hiringFor', HiringForSchema);

