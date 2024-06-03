import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const authorSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    name: {
        type: String,
        required: [true, 'Please provide an author name'],
    },
    bio: String,
});
const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);
export default Author;
