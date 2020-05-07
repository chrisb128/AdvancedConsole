import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    lastLogin: Date
});

export default mongoose.model('user', userSchema);