const express = require('express');

const UserRouter = require('./user-router');
const AuthRouter = require('./auth-router');

const routes = express.Router();

routes.use('/api/v1/users', UserRouter(express.Router));
routes.use('/api/v1/auth', AuthRouter(express.Router));

module.exports = routes;
