const express = require('express');
const repaymentController = require('../controllers/RepaymentController');
const router = express.Router();


router.get('/schedule/:userId', repaymentController.getRepaymentSchedule);
router.post('/payment/:userId/:repaymentId', repaymentController.makePayment);
router.get('/balance/:userId', repaymentController.getOutstandingBalance);


module.exports = router;