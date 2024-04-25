const express = require('express');
// const customerDatabase = require('../models/customerDatabase');
const { v4: uuidv4 } = require('uuid'); 
const createError = require('http-errors'); 



const createCurrentAccount = async (req, res, next) => {
    try {
        const { cifId, BVN, schemeType } = req.body;


        function generateTimestampUUID() {
            const timestamp = Date.now(); // Current timestamp in milliseconds
            const randomNum = Math.floor(Math.random() * 10000); // Random number from 0 to 9999
            return `${timestamp}${randomNum.toString().padStart(4, '0')}`; // Combines timestamp and random number
          }
          
          
        if (!cifId || !BVN || !schemeType) {
            // return next(createError(400, 'Missing required fields: cifId, BVN, or schemeType'));
            return res.status(400).json({
                message: ('Missing required fields: cifId, BVN, or schemeType', error),

            })
        }

        // Generate a unique account ID with the prefix "CAA"
        const accountId = 'CA' + uuidv4(); 

        const currentAccount = {
            // accountId,
            cifId,
            BVN,
            schemeType,
            createdDate: new Date(), // Optionally include a creation date
        };

        // TODO: Save `currentAccount` to your database (you might need a database model to handle this)
        // Example:
        // await CurrentAccountModel.create(currentAccount);

        res.status(201).json({
            message: 'Current account created successfully',
            data: currentAccount, // Return the created current account info
        });

    } catch (error) {
        console.error('Error creating current account:', error);
        next(createError(500, 'Internal Server Error')); // Use HTTP status codes for error handling
    }
};

module.exports = createCurrentAccount;
