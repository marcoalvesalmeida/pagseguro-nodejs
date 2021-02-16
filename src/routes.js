import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/Payment/SessionController';

const { Router } = require('express');

const routes = new Router();

// User routes
routes.post('/users', UserController.create);

// Payments routes
routes.post('/payments/session', SessionController.create);

module.exports = routes;
