
exports.seed = (knex) => knex('posts').del() // Deletes ALL existing entries
  .then(() => knex('posts').insert([ // Inserts seed entries
    {
      id: 1,
      title: 'helloworld1',
      content: 'hajimemashite kono sekai 1',
      user_id: 1,
    },
    {
      id: 2,
      title: 'helloworld2',
      content: 'hajimemashite kono sekai 2',
      user_id: 2,
    },
    {
      id: 3,
      title: 'helloworld3',
      content: 'hajimemashite kono sekai 3',
      user_id: 2,
    },
  ]));
