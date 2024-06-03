import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const bookSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    authors: [
        {
            type: String,
            ref: 'Author',
            required: [true, 'Please provide at least one author'],
        },
    ],
    ISBN: {
        type: String,
        unique: true,
        required: [true, 'Please provide an ISBN'],
    },
    publisher: {
        type: String,
        ref: 'Publisher',
        required: [true, 'Please provide a publisher'],
    },
    genre: {
        type: String,
        required: [true, 'Please provide a genre'],
    },
    language: String,
    description: String,
    coverImage: String,
    numberOfPages: Number,
    copiesAvailable: {
        type: Number,
        default: 0,
    },
    totalCopies: {
        type: Number,
        default: 0,
    },    
    tags: [String],
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
export default Book;
