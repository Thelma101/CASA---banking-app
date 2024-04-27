const customerDB = require('../models/cifDatabase'); // Ensure correct path
const createError = require('http-errors');

const createCustomerId = async (req, res, next) => {
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

        // Validate required fields
        if (!BVN || !phoneNumber || !DOB || !firstName || !lastName || !email) {
            return next(createError(400, 'Missing or invalid required fields'));
        }

        const generateTimestampUUID = () => {
            const randomNum = Math.floor(Math.random() * 1000000); /
            const paddedRandomNum = randomNum.toString().padStart(6, '0'); 
            return `CIF${paddedRandomNum}`; 
        };

        const customerId = generateTimestampUUID(); 

        // Check if a customer with the same CIF already exists
        const existingCustomer = await customerDB.findOne({ customerId });
        if (existingCustomer) {
            return next(createError(409, 'Customer Identification File already exists'));
        }

        // Create and save a new customer
        const newCustomer = new customerDB({
            customerId,
            date: new Date(), 
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
        });

        await newCustomer.save(); 

        res.status(200).json({
            customerId,
            message: 'Customer ID generated successfully',
        });

    } catch (error) {
        console.error('Error creating customer ID:', error); 
        next(createError(500, 'Internal Server Error', error)); 
    }
};

module.exports = createCustomerId;
