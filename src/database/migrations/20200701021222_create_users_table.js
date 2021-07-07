exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.string('id', 36).primary().notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('avatar').nullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();
  });

exports.down = (knex) => knex.schema.dropTable('users');
