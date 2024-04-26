const express = require('express');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');

const generateTimestampUUID = () => {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 10000); // Random number from 0 to 9999
    const paddedRandomNum = randomNum.toString().padStart(1, '0'); // Ensure 4-digit padding
    return `CA${timestamp}${paddedRandomNum}`; // Combines prefix with timestamp and random number
};

const createCurrentAccount = async (req, res, next) => {
    try {
        const { cifId, BVN, schemeType } = req.body;

        if (!cifId || !BVN || !schemeType) {
            return next(createError(400, 'Missing required fields: cifId, BVN, or schemeType'));
        }

        const accountNumber = generateTimestampUUID(); // Generate unique account number

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
