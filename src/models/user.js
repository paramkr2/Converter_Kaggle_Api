import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    username: { type: String, required: true }
});

const UserModel = model('User', UserSchema);

export default UserModel;
