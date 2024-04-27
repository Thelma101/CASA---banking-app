const express = require('express');
const createError = require('http-errors');
const currentAccount = require('../models/currentAccountSchema');
const savingsAccount = require('../models/savingsAccountSchema');

const handleTransaction = async (req, res, next) => {
    try {
        const { accountId, schemeType, transactionType, amount } = req.body;

        // Validate required fields
        if (!accountId || !schemeType || !transactionType || amount === undefined) {
            return next(createError(400, 'Missing required fields'));
        }

        const transactionAmount = parseFloat(amount);

        // Find the account based on schemeType
        let account;
        if (schemeType === 'CAA') {
            account = await currentAccount.findOne({ accountId });
        } else if (schemeType === 'SBA') {
            account = await savingsAccount.findOne({ accountId });
        } else {
            return next(createError(400, 'Invalid account type'));
        }

        if (!account) {
            return next(createError(404, 'Account not found'));
        }

        // Handle credit or debit based on transactionType
        if (transactionType === 'C') {
            // Credit the account
            account.balance += transactionAmount;
            const message = `Account credited successfully with ${transactionAmount}`;

            res.status(200).json({
                message,
                transactionType: 'Credit',
                amount: transactionAmount,
                accountId: account.accountId,
                updatedBalance: account.balance,
                timestamp: new Date(),
            });

        } else if (transactionType === 'D') {
            if (account.balance < transactionAmount) {
                return next(createError(400, 'Insufficient funds to debit'));
            }
            // Debit the account
            account.balance -= transactionAmount;
            const message = `Account debited successfully by ${transactionAmount}`;

            res.status(200).json({
                message,
                transactionType: 'Debit',
                amount: transactionAmount,
                accountId: account.accountId,
                updatedBalance: account.balance,
                timestamp: new Date(),
            });

        } else {
            return next(createError(400, 'Invalid transaction type. Use "C" for credit and "D" for debit'));
        }

        await account.save();

        // res.status(200).json({
        //     message: `Account ${transactionType}ed successfully`,
        //     balance: account.balance,
        // });

    } catch (error) {
        console.error('Error handling transaction:', error);
        return next(createError(500, 'Internal Server Error')); // Handle unexpected errors
    }
};

module.exports = handleTransaction;
