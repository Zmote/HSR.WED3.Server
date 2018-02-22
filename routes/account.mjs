import express from 'express';
import accountController from '../controllers/account';

const router = express.Router();

router.get('/', (req, res, next) =>  accountController.getAccount(req, res, next,req.user.accountNr ));

router.get('/transactions', accountController.getTransactions);
router.post('/transactions', accountController.addTransactions);

router.get('/:accountNr', (req, res, next) =>  accountController.getAccount(req, res, next,req.params.accountNr ));

export default router;