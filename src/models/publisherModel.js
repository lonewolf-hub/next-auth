import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const publisherSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    name: {
        type: String,
        required: [true, 'Please provide a publisher name'],
    },
    location: String,
    // Add other fields as needed
});

const Publisher = mongoose.models.Publisher || mongoose.model('Publisher', publisherSchema);
export default Publisher;
