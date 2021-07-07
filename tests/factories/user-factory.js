const faker = require('faker');
const factory = require('./factory');

module.exports = class UserFactory {
  static build() {
    return factory('users', 'id', async () => ({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }));
  }
};
