const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required!'],
        minLength: [4, 'Product title must be at least 4 characters long!'],
        maxLength: [50, 'Product title must be less than 50 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required!'],
        minLength: [20, 'Product description must be at least 20 characters long!'],
        maxLength: [500, 'Product description must be less than 500 characters long!'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required!'],
        min: [1, 'Product price must be a positive number!'],
    },
    user: {
        type: String,
    },
    email: {
        type: String,
    },
    uid: {
        type: String,
    },
    photoURL: {
        type: String,
    },
    date: {
        type: String,
    },
    productPhoto: {
        type: String,
    },
});

module.exports = mongoose.model('Product', productSchema);