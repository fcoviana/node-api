const Repository = require('./repository');

module.exports = class UserRepository extends Repository {
  constructor(db, entity, table) {
    super({ db, table, entity });
    this.db = db;
    this.table = table;
  }
};
