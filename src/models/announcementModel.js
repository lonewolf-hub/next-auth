import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const announcementSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    title: {
        type: String,
        required: [true, 'Please provide an announcement title'],
    },
    content: {
        type: String,
        required: [true, 'Please provide announcement content'],
    },
    createdBy: {
        type: String,
        ref: 'User',
        required: [true, 'Please provide the creator'],
    },
    // Add other fields as needed
});

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);
export default Announcement;
