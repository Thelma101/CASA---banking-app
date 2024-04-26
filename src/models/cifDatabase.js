const mongoose = require('mongoose');
const validator = require('validator');

// Define the schema for a Customer
const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
    min: 100000,
    max: 999999,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  BVN: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
    validate: {
      validator: validator.isNumeric,
      message: 'BVN must be numeric',
    },
  },
  title: {
    type: String,
    required: true,
    enum: ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'], 
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  // fullName: {
  //   type: String,
  //   required: true,
  // },
  DOB: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => new Date(value) < new Date(),
      message: 'Date of birth must be in the past',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: validator.isNumeric,
      message: 'Phone number must be numeric',
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'], // Restricts to specific gender values
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
  },
  countryOfResidence: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: false,
  },
});


module.exports = mongoose.model('Customer', customerSchema);
