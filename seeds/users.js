
exports.seed = (knex) => knex('users').del() // Deletes ALL existing entries

  .then(() => knex('users').insert([ // Inserts seed entries
    {
      id: 1,
      email: 'email1@example.com',
      username: 'user1',
      password: '$2b$12$kzESFFBQso6uh9gxQIsHTOoome.3q8qZPYfeXbYbhVCoB55bMUDyK', // bcrypt.hash('password1', 12)
    },
    {
      id: 2,
      email: 'email2@example.com',
      username: 'user2',
      password: '$2b$12$LPWBpgEfk9LIuslfaYubauQPCrn0n94bfBUydr6gifx81YMLmJGSe', // bcrypt.hash('password2', 12)
    },
    {
      id: 3,
      email: 'email3@example.com',
      username: 'user3',
      password: '$2b$12$hGo88Zyi5E72X7qlgLYIcuVA9Bnej3oDcqH.1lBlWuo8g5Kab.QqG', // bcrypt.hash('password3', 12)
    },
  ]));
