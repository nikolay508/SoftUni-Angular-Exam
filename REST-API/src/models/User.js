import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Username must be at least 2 characters long!'],
        maxLength: [20, 'Username must be no longer than 20 characters!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email must be at least 10 characters long!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be at least 4 characters long!']
    },
    courses: [{
        type: ObjectId,
        ref: 'Course'
    }]
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

const User = model('User', userSchema);

export default User;