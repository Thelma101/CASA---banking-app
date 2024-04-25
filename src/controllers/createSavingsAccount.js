const express = require('express');
// const customerDatabase = require('../models/customerDatabase');
const { v4: uuidv4 } = require('uuid'); 
const createError = require('http-errors'); 



const createsavingsAccount = async (req, res, next) => {
    try {
        const { cifId, BVN, schemeType } = req.body;

        if (!cifId || !BVN || !schemeType) {
            // return next(createError(400, 'Missing required fields: cifId, BVN, or schemeType'));
            return res.status(400).json({
                message: ('Missing required fields: cifId, BVN, or schemeType', error),

            })
        }

        // Generate a unique account ID with the prefix "CAA"
        const accountId = 'SB' + uuidv4(); 

        const savingsAccount = {
            // accountId,
            cifId,
            BVN,
            schemeType,
            createdDate: new Date(), // Optionally include a creation date
        };

        // TODO: Save `savingsAccount` to your database (you might need a database model to handle this)
        // Example:
        // await savingsAccountModel.create(savingsAccount);

        res.status(201).json({
            message: 'savings account created successfully',
            data: savingsAccount, // Return the created savings account info
        });

    } catch (error) {
        console.error('Error creating savings account:', error);
        next(createError(500, 'Internal Server Error')); // Use HTTP status codes for error handling
    }
};

module.exports = createsavingsAccount;
