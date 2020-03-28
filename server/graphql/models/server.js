const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = new Schema({
    name: String,
    host: String,
    status: String
});


module.exports = mongoose.model('server', serverSchema);