const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    username: String,
    created: Date,
});

const model = mongoose.model('user', mySchema);

module.exports = model;