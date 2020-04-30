import mongoose from 'mongoose';
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

export default mongoose.model('event', eventSchema);