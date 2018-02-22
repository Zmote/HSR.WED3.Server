const jwtSecret =  '07afa4435f1a4c46801691c859ce504716fd68fd113d43ecbc2754649ee401f7380ac84e877a481f84a3ec8c530851958773d1af93bf4b4cba15bd04c827de09';

const signOptions = {expiresIn: "1d", audience :"self", issuer : "bank"};
const validateOptions = {secret: jwtSecret, audience :"self", issuer : "bank"};
const dbPath = {
    users: './data/users.db',
    accounts: './data/accounts.db',
    transactions: './data/transactions.db'
};
const initialBalance = 1000;

let inMemory = false;

export default {
    jwt: {jwtSecret, signOptions, validateOptions},
    db: {inMemory, dbPath},
    account: {initialBalance}
};