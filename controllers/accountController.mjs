import {accountService} from '../services/accountService';
import {userService} from '../services/userService';

async function getAccount(req, res, next, accountNr) {
  try {
      const account = await accountService.get(accountNr);
      const user = userService.getById(account.ownerId);

      if (String(req.user.accountNr) === accountNr) {
          account.owner = user;
          res.json(account);
      }
      else {
          let {accountNr} = account;
          let {firstname, lastname} = user;
          res.json({accountNr, owner: {firstname, lastname}});
      }
  }
  catch (err) {
      next(err);
  }
}

async function getTransactions(req, res, next) {
    try {
        res.json(
            await accountService.getTransactions(
                String(req.user.accountNr),
                Number(req.query.count),
                Number(req.query.skip),
                new Date(req.query.fromDate),
                new Date(req.query.toDate)));
    } catch (err) {
        next(err);
    }
}

async function addTransactions(req, res, next) {
    try {
        res.json(
            await accountService.addTransaction(
                String(req.user.accountNr),
                String(req.body.target),
                Number(req.body.amount),
                null));
    } catch (err) {
        next(err);
    }
}

export const accountController = {getAccount, getTransactions, addTransactions };
