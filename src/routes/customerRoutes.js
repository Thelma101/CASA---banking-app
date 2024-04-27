const express = require('express');
const router = express.Router();
const createCustomerId = require('../controllers/createCustomerId');
const createCurrentAccount = require('../controllers/createCurrentAccount');
const createSavingsAccount = require('../controllers/createSavingsAccount');
const transaction = require('../controllers/transactions');
const closeAccount = require('../controllers/closeAccount');


router.post('/createCIF', createCustomerId.createCustomerId);
router.post('/createCAA', createCurrentAccount.createCurrentAccount);
router.post('/createSBA', createSavingsAccount.createSavingsAccount);
router.post('./transaction', transaction.transaction);
router.post('./closeAccount', closeAccount.closeAccount);

module.exports = router;