const express = require('express');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const cifDatabase = require('../models/cifDatabase');

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

        // Check if the customer exists in the CIF database
        const customer = await cifDatabase.findCustomerById(cifId);
        if (!customer) {
            return next(createError(404, 'Customer not found'));

        }

        const fullName = customer.middleName
            ? `${customer.firstName} ${customer.middleName} ${customer.lastName}`
            : `${customer.firstName} ${customer.lastName}`; // If no middle name, concatenate first and last

            
        const accountNumber = generateTimestampUUID();
        const currentAccount = {
            ullName: customer.fullName,
            accountNumber, 
            cifId,
            BVN,
            schemeType,
            createdDate: new Date(), 
        };

        // TODO: Save `currentAccount` to your database
        // Example:
        // await CurrentAccountModel.create(currentAccount);

        res.status(201).json({
            message: 'Current account created successfully',
            data: currentAccount, 
        });

    } catch (error) {
        console.error('Error creating current account:', error);
        return next(createError(500, 'Internal Server Error')); 
    }
};

module.exports = createCurrentAccount;
