const knex = require('../config/knex');
const User = require('../entities/user');
const { UserRepository } = require('../repositories');
const { UserService } = require('../services');

module.exports = () => {
  const userRepository = new UserRepository(knex, User, 'users');
  const userService = new UserService({ userRepository });

  return userService;
};
