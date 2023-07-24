const mongoose = require('mongoose');

const postingSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: 'This is Required'
    },
    description: {
        type: String,
        required: 'This is Required'
    },
    price: {
        type: String,
        required: 'This is Required'
    },
    userId: {
        type: String,
        required: 'This is Required'
    },
    houseImages: {
        type: Array
    },
    verification: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Posting', postingSchema);