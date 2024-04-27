const express = require('express');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const cifDatabase = require('../models/cifDatabase');

const generateTimestampUUID = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000); 
    const paddedRandomNum = randomNum.toString().padStart(6, '001'); 
    return `SB${paddedRandomNum}`; 
};

const createsavingsAccount = async (req, res, next) => {
    try {
        const { cifId, BVN, schemeType } = req.body;

        if (!cifId || !BVN || !schemeType) {
            return next(createError(400, 'Missing required fields: Field must not be empty'));
        }

        // // Check if the customer exists in the CIF database
        // const customer = await cifDatabase.findCustomerById(cifId);
        // if (!customer) {
        //     return next(createError(404, 'Customer not found'));

        // }

        // const fullName = customer.middleName
        //     ? `${customer.firstName} ${customer.middleName} ${customer.lastName}`
        //     : `${customer.firstName} ${customer.lastName}`;

        const accountNumber = generateTimestampUUID();
        const savingsAccount = {
            // fullName: customer.fullName,
            accountNumber, 
            cifId,
            BVN,
            schemeType,
            createdDate: new Date(), 
        };

        // TODO: Save `savingsAccount` to your database
        // Example:
        // await savingsAccountModel.create(savingsAccount);
        

        res.status(201).json({
            message: 'savings account created successfully',
            CustomerInfo: savingsAccount, 
        });

    } catch (error) {
        console.error('Error creating savings account:', error);
        return next(createError(500, 'Internal Server Error')); 
    }
};

module.exports = createsavingsAccount;
