import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    username: {
        type: String,
        required: [true, "Please provide a userName"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
