require('./src/bootstrap');

const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

module.exports = {
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: 'utf8',
    port: DB_PORT,
  },
  migrations: {
    directory: './src/database/migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: __dirname + '/knex/seeds',
  },
};
