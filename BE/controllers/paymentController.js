const data = require('../mongodb');
const axios = require('axios');
const Payment = require('../models/paymentModel');
const mongoose = require('mongoose');

async function paymentStripe(req, res) {
    const stripe = require('stripe')(`${data.secretKey}`);
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
        });
        res.status(200).json(paymentIntent);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function paymentCoinbase(req, res) {
    const { title, price, user } = req.body.product;
    const {uid, email, displayName} = req.body.user;
    let {description} = req.body.product;
    if(description.length > 200) {
        description = description.substring(0, 200);
    }

    const charge = {
        "name": title,
        "description": description,
        "local_price": {
            "amount": Number(price),
            "currency": "USD"
        },
        "pricing_type": "fixed_price",
        "metadata": {
            "customer_id": uid,
            "customer_name": displayName,
            "customer_email": email,
            "merchant_name": user,
        }
    } 

    const headers = {
            'Content-Type': 'application/json',
            'X-CC-Api-Key': '01603b75-eea1-4ccf-a680-f0693ecbc4b7',
            'X-CC-Version': '2018-03-22',
    };
    

    try {
        const response = await axios.post('https://api.commerce.coinbase.com/charges', charge, {headers});
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err.response.data)
    }

}

async function paymentDetails(req, res) {
    const {user, merchant,price, productName, date} = req.body;
    try {
        const payment = await Payment.create({user, merchant, price, productName, date});
        res.status(200).json(payment);
    } catch(err) {
        res.status(500).json({ error: err });
    }
}

async function paymentDetailsGet(req, res) {
    const {uid} = req.query;
    try {
        const payments = await Payment.find({merchant: uid});
        res.status(200).json(payments);
    } catch(err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    paymentStripe,
    paymentCoinbase,
    paymentDetails,
    paymentDetailsGet
}