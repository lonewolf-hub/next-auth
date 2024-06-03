import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const returnedBookSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    issuedBook: {
        type: String,
        ref: 'IssuedBook',
        required: [true, 'Please provide the issued book'],
    },
    returnDate: {
        type: Date,
        default: Date.now,
    },
});

const ReturnedBook = mongoose.models.ReturnedBook || mongoose.model('ReturnedBook', returnedBookSchema);
export default ReturnedBook;
