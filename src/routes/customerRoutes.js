const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const currentAccountController = require('../controllers/currentAccountController');
const savingsAccountController = require('../controllers/savingsAccountController');


router.post('/', customerController.createCustomer);
router.post('/', currentAccountController.createCurrentAccount);
router.post('/', savingsAccountController.createSavingsAccount);

module.exports = router;