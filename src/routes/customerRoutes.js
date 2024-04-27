const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const createCurrentAccount = require('../controllers/createCurrentAccount');
const createSavingsAccount = require('../controllers/createSavingsAccount');
const transaction = require('../controllers/transaction');


router.post('/', customerController.createCustomer);
router.post('/', createCurrentAccount.createCurrentAccount);
router.post('/', createSavingsAccount.createSavingsAccount);
router.post('./transaction', transaction.transaction);

module.exports = router;