const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    serverId: {
        type: Schema.Types.ObjectId,
        ref: 'Server'
    },
    type: Number,
    time: Date,    
    message: String
});

module.exports = mongoose.model('event', eventSchema);