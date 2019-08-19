exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('username');
  table.string('email');
  table.string('password');
});

exports.down = (knex) => knex.schema.dropTable('users');
