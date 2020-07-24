const express = require('express');
const transactionRouter = express.Router();
const {
  create,
  findAll,
  update,
  remove,
  findById,
  findDistinctYearMonth,
} = require('../services/transactionService.js');

transactionRouter.get('/', findAll);
transactionRouter.get('/year_month', findDistinctYearMonth);
transactionRouter.get('/:id', findById);
transactionRouter.post('/', create);
transactionRouter.patch('/:id', update);
transactionRouter.delete('/:id', remove);

module.exports = transactionRouter;
