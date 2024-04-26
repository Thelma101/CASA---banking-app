const express = require('express');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');

const generateTimestampUUID = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000); 
    const paddedRandomNum = randomNum.toString().padStart(6, '0'); 
    return `CA00${paddedRandomNum}`; 
};

const createCurrentAccount = async (req, res, next) => {
    try {
        const { cifId, BVN, schemeType } = req.body;

        if (!cifId || !BVN || !schemeType) {
            return next(createError(400, 'Missing required fields: cifId, BVN, or schemeType'));
        }

        const accountNumber = generateTimestampUUID();
        const currentAccount = {
            accountNumber, // Include unique account number
            cifId,
            BVN,
            schemeType,
            createdDate: new Date(), // Optionally include creation date
        };

        // TODO: Save `currentAccount` to your database
        // Example:
        // await CurrentAccountModel.create(currentAccount);

        res.status(201).json({
            message: 'Current account created successfully',
            data: currentAccount, // Return created account info
        });

    } catch (error) {
        console.error('Error creating current account:', error);
        return next(createError(500, 'Internal Server Error')); // Return proper status and message
    }
};

module.exports = createCurrentAccount;
