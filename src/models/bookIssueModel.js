import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const issuedBookSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    book: {
        type: String,
        ref: 'Book',
        required: [true, 'Please provide a book'],
    },
    user: {
        type: String,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
    // Add other fields as needed
});

const IssuedBook = mongoose.models.IssuedBook || mongoose.model('IssuedBook', issuedBookSchema);
export default IssuedBook;
