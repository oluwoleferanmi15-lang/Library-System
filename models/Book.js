const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['IN', 'OUT'],
        default: 'IN'
    },
    authors: [{                         
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendant',
        default: null
    },
    returnDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
