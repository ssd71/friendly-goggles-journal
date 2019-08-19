const conf = {
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },
};


module.exports = conf;
