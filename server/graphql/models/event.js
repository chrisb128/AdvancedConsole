const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    serverId: {
        type: Schema.Types.ObjectId,
        ref: 'Server'
    },
    player: { uuid: String, username: String },
    type: { type: Number },
    time: Date,    
    message: String
});

module.exports = mongoose.model('event', eventSchema);