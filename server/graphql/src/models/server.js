import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serverSchema = new Schema({
    name: String,
    host: String,
    status: String,
    lastReportTime: Date,
    users: [{ username: String, uuid: String }]
});


export default mongoose.model('server', serverSchema);