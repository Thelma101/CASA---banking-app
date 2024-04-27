
const accountsDatabase = [
  {
    accountId: 'CA123456',
    accountType: 'CAA',
    balance: 50000,
  },
  {
    accountId: 'SB654321',
    accountType: 'SBA',
    balance: 1000000,
  },
  {
    accountId: 'CA7890012',
    accountType: 'CAA',
    balance: 7500,
  },
  {
    accountId: 'SB345678',
    accountType: 'SBA',
    balance: 150000,
  },
  {
    accountId: 'CA9001234',
    accountType: 'CAA',
    balance: 20000,
  },
  {
    accountId: 'SB7890012',
    accountType: 'SBA',
    balance: 80000,
  },
  {
    accountId: 'CA345678',
    accountType: 'CAA',
    balance: 60000,
  },
  {
    accountId: 'SB123456',
    accountType: 'SBA',
    balance: 120000,
  },
];

const findAccountById = (accountId) => {
  return accountsDatabase.find((account) => account.accountId === accountId);
};

module.exports = {accountsDatabase, findAccountById};