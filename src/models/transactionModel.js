import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const transactionSchema = new mongoose.Schema({
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
    transactionType: {
        type: String,
        enum: ['issue', 'return'],
        required: [true, 'Please provide a transaction type'],
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    // Add other fields as needed
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default Transaction;
