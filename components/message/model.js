const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    created: Date,
});

const model = mongoose.model('message', mySchema);

module.exports = model;