import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const notificationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    title: {
        type: String,
        required: [true, 'Please provide a notification title'],
    },
    content: {
        type: String,
        required: [true, 'Please provide notification content'],
    },
    user: {
        type: String,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
