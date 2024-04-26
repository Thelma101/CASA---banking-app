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
        if (!BVN || !title || !firstName || !lastName || !email) {
            return next(createError(400, 'Missing or invalid required fields'));
        }

        const generateTimestampUUID = () => {
            const timestamp = Date.now(); // Current timestamp in milliseconds
            const randomNum = Math.floor(Math.random() * 1000000); // 6-digit random number
            const paddedRandomNum = randomNum.toString().padStart(6, '0'); // Fixed 6-digit padding
            return `CIF${paddedRandomNum}`; // Generates unique identifier with prefix
        };

        const customerId = generateTimestampUUID(); // Proper variable declaration

        // Check if a customer with the same CIF already exists
        const existingCustomer = await customerDB.findOne({ customerId });
        if (existingCustomer) {
            return next(createError(409, 'Customer Identification File already exists'));
        }

        // Create and save a new customer
        const newCustomer = new customerDB({
            customerId,
            date: new Date(), // Optional creation date
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

        await newCustomer.save(); // Save to the database

        res.status(200).json({
            customerId,
            message: 'Customer ID generated successfully',
        });

    } catch (error) {
        console.error('Error creating customer ID:', error); // Console error for debugging
        next(createError(500, 'Internal Server Error')); // Handle unexpected errors
    }
};

module.exports = createCustomerId;
