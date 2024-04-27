const mongoose = require('mongoose');


const currentAccountSchema = new mongoose.Schema({
    // Unique identifier for the account, with a string type and a unique constraint
    // accountId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },

    // Customer Identification File (CIF) ID, which links the account to a customer
    cifId: {
        type: String,
        required: true,
    },

    BVN: {
        type: String,
        required: true,
    },

    schemeType: {
        type: String,
        required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        default: 0,
    },
    sourceAccountId: {
        type: String, 
        required: true, 
        unique: true
    },
    targetAccountId: {
        type: String, 
        required: true, 
        unique: true
    },
    transactionType: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
});


// Create a model from the schema
const CurrentAccount = mongoose.model('CurrentAccount', currentAccountSchema);

module.exports = CurrentAccount;
