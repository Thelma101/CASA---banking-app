const express = require('express');
const createError = require('http-errors');
const { findAccountById, accountsDatabase } = require('../models/accountsDatabaseSchema')

const closeAccount = async (req, res, next) => {
  try {
    const { accountId } = req.body;

    if (!accountId) {
      return next(createError(400, 'Account ID is required to close an account'));
    }

    const account = findAccountById(accountId);

    if (!account) {
      return next(createError(404, 'Account not found'));
    }

    // Remove the account from the database
    accountsDatabase.splice(
      accountsDatabase.findIndex((acc) => acc.accountId === accountId),
      1
    );

    res.status(200).json({
      message: `Account ${accountId} closed successfully.`,
    });

  } catch (error) {
    console.error('Error closing account:', error);
    return next(createError(500, 'Internal Server Error'));
  }
};

module.exports = closeAccount;
