const customerDB = require('../models/customerDB');
const createError = require('http-errors');

const createCustomerId = async (req, res, next) => {
    console.log('Incoming request body:', req.body); 
    try {
        const {
            BVN,
            title,
            firstName,
            middleName,
            lastName,
            DOB,
            email,
            phoneNumber,
            address,
            occupation,
            gender,
            maritalStatus,
            countryOfResidence,
        } = req.body;

        // Check if customer with the same BVN already exists
        const existingCustomer = await customerDB.findOne({ cifID });
        if (existingCustomer) {
            return next(createError(409, 'Customer Identification File already exists'));
        }

        // Generate customer ID
        const customerId = Math.floor(100000 + Math.random() * 900000);

        // Create and save a new customer
        const newCustomer = new customerDB({
            cifID: customerId,
            date: new Date(),
            BVN,
            title,
            firstName,
            middleName,
            lastName,
            fullName: middleName
                ? `${firstName} ${middleName} ${lastName}`
                : `${firstName} ${lastName}`,
            DOB,
            email,
            phoneNumber,
            address,
            occupation,
            gender,
            maritalStatus,
            countryOfResidence,
        });

        await newCustomer.save();

        res.status(200).json({
            customerId,
            message: 'Customer ID generated successfully',
        });

    } catch (error) {
        console.error('Error creating customer ID:', error);
        next(createError(500, 'Internal Server Error'));
    }
};

module.exports = createCustomerId;
