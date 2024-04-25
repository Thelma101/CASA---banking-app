// const CustomerModel = require('../models/Customer');
const createError = require('http-errors');

const createCustomerId = async (req, res, next) => {
    try {
        const {
            date,
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
        const existingCustomer = await CustomerModel.findOne({ BVN });
        if (existingCustomer) {
            return next(createError(409, 'Customer with this BVN already exists'));
        }

        // Generate customer ID
        const customerId = Math.floor(100000 + Math.random() * 900000);

        // Create and save a new customer
        const newCustomer = new CustomerModel({
            customerId,
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
