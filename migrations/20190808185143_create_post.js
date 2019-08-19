
exports.up = (knex) => knex.schema.createTable('posts', (table) => {
  table.increments('id').primary();
  table.string('title');
  table.string('content');
  table.integer('user_id').references('users.id');
  table.datetime('created_on').defaultTo((new Date()).toLocaleString());
});

exports.down = (knex) => knex.schema.dropTable('posts');
