import express from 'express';
import { getMonthlySummary , createTransaction , getLast7DaysExpenses , getLastTransactions , DeleteTransaction} from '../controllers/transaction.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.get('/monthly-summary', getMonthlySummary);
router.post('/create-transaction' , createTransaction);
router.get('/last-7-days-expenses' , getLast7DaysExpenses);
router.get('/getTransactions' , getLastTransactions);
router.delete('/delete/:id' , DeleteTransaction);


export default router;