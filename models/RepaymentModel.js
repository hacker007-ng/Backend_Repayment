const mongoose = require('mongoose');

const tableRepaymentSchema = new mongoose.Schema({
  repaymentId: {
    type: String,
    required: true,
    unique: true,
  },
  month: {
    type: Number,
    required: true,
  },
  principalRepayment: {
    type: Number,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  outstandingBalance: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['DUE', 'COMPLETED'],
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  paymentDate: {
    type: Date,
    required: false,
  },
});

const repaymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  applicationId: {
    type: String,
    required: true,
  },
  principalAmount: {
    type: Number,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  tableRepayment: {
    type: [tableRepaymentSchema],
    default: [],
  },
});

module.exports = mongoose.model('Repayment', repaymentSchema);