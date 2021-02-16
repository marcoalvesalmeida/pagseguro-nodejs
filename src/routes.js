import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/Payment/SessionController';
import TransactionController from './app/controllers/Payment/TransactionController';

const { Router } = require('express');

const routes = new Router();

// User routes
routes.post('/users', UserController.create);

// Payments routes
routes.post('/payments/session', SessionController.create);

// Transactions routes
routes.post('/payments/transactions', TransactionController.create);
routes.get(
  '/payments/transactions/:transactionCode',
  TransactionController.show
);

module.exports = routes;
