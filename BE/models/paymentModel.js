const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    merchant: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    productName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Payment', paymentSchema);