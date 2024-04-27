const express = require('express');
const createError = require('http-errors');
const currentAccount = require('../models/currentAccountSchema');
const savingsAccount = require('../models/savingsAccountSchema');
const accountsDatabase = require('../models/accountsDatabaseSchema');

const handleTransaction = async (req, res, next) => {
  try {
    const {
      sourceAccountId,
      targetAccountId,
      transactionType,
      amount
    } = req.body;

    // Validate required fields
    if (!sourceAccountId || !targetAccountId || !transactionType || amount === undefined) {
      return next(createError(400, 'Missing required fields'));
    }

    const transactionAmount = parseFloat(amount);

    // Determine the source account type
    let sourceAccount;
    if (sourceAccountId.startsWith('CA')) {
      sourceAccount = await transactionDB.findOne({ accountId: sourceAccountId });
    } else if (sourceAccountId.startsWith('SB')) {
      sourceAccount = await transactionDB.findOne({ accountId: sourceAccountId });
    } else {
      return next(createError(400, 'Invalid source account ID format'));
    }

    // Determine the target account type
    let targetAccount;
    if (targetAccountId.startsWith('CA')) {
      targetAccount = await transactionDB.findOne({ accountId: targetAccountId });
    } else if (targetAccountId.startsWith('SB')) {
      targetAccount = await transactionDB.findOne({ accountId: targetAccountId });
    } else {
      return next(createError(400, 'Invalid target account ID format'));
    }

    if (!sourceAccount || !targetAccount) {
      return next(createError(404, 'Account not found'));
    }

    if (transactionType === 'D') {
      // Debit from the source account
      if (sourceAccount.balance < transactionAmount) {
        return next(createError(400, 'Insufficient funds in source account'));
      }
      sourceAccount.balance -= transactionAmount;

      // Credit to the target account
      targetAccount.balance += transactionAmount;

      // Save the changes
      await sourceAccount.save();
      await targetAccount.save();

      res.status(200).json({
        message: `Transaction completed: ${sourceAccountId} debited and ${targetAccountId} credited with ${transactionAmount}`,
        debitedAccount: {
          accountId: sourceAccount.accountId,
          updatedBalance: sourceAccount.balance,
        },
        creditedAccount: {
          accountId: targetAccount.accountId,
          updatedBalance: targetAccount.balance,
        },
        timestamp: new Date(),
      });

    } else {
      return next(createError(400, 'Invalid transaction type. Use "D" for debit'));
    }

  } catch (error) {
    console.error('Error handling transaction:', error);
    return next(createError(500, 'Internal Server Error'));
  }
};

module.exports = handleTransaction;



// const express = require('express');
// const createError = require('http-errors');
// const currentAccount = require('../models/currentAccountSchema');
// const savingsAccount = require('../models/savingsAccountSchema');

// const handleTransaction = async (req, res, next) => {
//   try {
//     const {
//       sourceAccountId,
//       sourceAccountType,
//       targetAccountId,
//       targetAccountType,
//       transactionType,
//       amount
//     } = req.body;

//     // Validate required fields
//     if (
//       !sourceAccountId ||
//       !sourceAccountType ||
//       !targetAccountId ||
//       !targetAccountType ||
//       !transactionType ||
//       amount === undefined
//     ) {
//       return next(createError(400, 'Missing required fields'));
//     }

//     const transactionAmount = parseFloat(amount);

//     // Find the source and target accounts based on their types
//     let sourceAccount, targetAccount;
//     if (sourceAccountType === 'CAA') {
//       sourceAccount = await currentAccount.findOne({ accountId: sourceAccountId });
//     } else if (sourceAccountType === 'SBA') {
//       sourceAccount = await savingsAccount.findOne({ accountId: sourceAccountId });
//     } else {
//       return next(createError(400, 'Invalid source account type'));
//     }

//     if (targetAccountType === 'CAA') {
//       targetAccount = await currentAccount.findOne({ accountId: targetAccountId });
//     } else if (targetAccountType === 'SBA') {
//       targetAccount = await savingsAccount.findOne({ accountId: targetAccountId });
//     } else {
//       return next(createError(400, 'Invalid target account type'));
//     }

//     if (!sourceAccount || !targetAccount) {
//       return next(createError(404, 'Account not found'));
//     }

//     if (transactionType === 'D') {
//       // Debit from the source account
//       if (sourceAccount.balance < transactionAmount) {
//         return next(createError(400, 'Insufficient funds in source account'));
//       }
//       sourceAccount.balance -= transactionAmount;

//       // Credit to the target account
//       targetAccount.balance += transactionAmount;

//       // Save the changes
//       await sourceAccount.save();
//       await targetAccount.save();

//       res.status(200).json({
//         message: `Transaction completed: ${sourceAccountId} debited and ${targetAccountId} credited with ${transactionAmount}`,
//         debitedAccount: {
//           accountId: sourceAccount.accountId,
//           updatedBalance: sourceAccount.balance,
//         },
//         creditedAccount: {
//           accountId: targetAccount.accountId,
//           updatedBalance: targetAccount.balance,
//         },
//         timestamp: new Date(),
//       });

//     } else {
//       return next(createError(400, 'Invalid transaction type. Use "D" for debit'));
//     }

//   } catch (error) {
//     console.error('Error handling transaction:', error);
//     return next(createError(500, 'Internal Server Error'));
//   }
// };

// module.exports = handleTransaction;


// const express = require('express');
// const createError = require('http-errors');
// const currentAccount = require('../models/currentAccountSchema');
// const savingsAccount = require('../models/savingsAccountSchema');

// const handleTransaction = async (req, res, next) => {
//     try {
//         const { accountId, schemeType, transactionType, amount } = req.body;

//         // Validate required fields
//         if (!accountId || !schemeType || !transactionType || amount === undefined) {
//             return next(createError(400, 'Missing required fields'));
//         }

//         const transactionAmount = parseFloat(amount);

//         // Find the account based on schemeType
//         let account;
//         if (schemeType === 'CAA') {
//             account = await currentAccount.findOne({ accountId });
//         } else if (schemeType === 'SBA') {
//             account = await savingsAccount.findOne({ accountId });
//         } else {
//             return next(createError(400, 'Invalid account type'));
//         }

//         if (!account) {
//             return next(createError(404, 'Account not found'));
//         }

//         // Handle credit or debit based on transactionType
//         if (transactionType === 'C') {
//             // Credit the account
//             account.balance += transactionAmount;
//             const message = `Account credited successfully with ${transactionAmount}`;

//             res.status(200).json({
//                 message,
//                 transactionType: 'Credit',
//                 amount: transactionAmount,
//                 accountId: account.accountId,
//                 updatedBalance: account.balance,
//                 timestamp: new Date(),
//             });

//         } else if (transactionType === 'D') {
//             if (account.balance < transactionAmount) {
//                 return next(createError(400, 'Insufficient funds to debit'));
//             }
//             // Debit the account
//             account.balance -= transactionAmount;
//             const message = `Account debited successfully by ${transactionAmount}`;

//             res.status(200).json({
//                 message,
//                 transactionType: 'Debit',
//                 amount: transactionAmount,
//                 accountId: account.accountId,
//                 updatedBalance: account.balance,
//                 timestamp: new Date(),
//             });

//         } else {
//             return next(createError(400, 'Invalid transaction type. Use "C" for credit and "D" for debit'));
//         }

//         await account.save();

//         // res.status(200).json({
//         //     message: `Account ${transactionType}ed successfully`,
//         //     balance: account.balance,
//         // });

//     } catch (error) {
//         console.error('Error handling transaction:', error);
//         return next(createError(500, 'Internal Server Error')); // Handle unexpected errors
//     }
// };

// module.exports = handleTransaction;
