const Knex = require('knex');
const bcrypt = require('bcrypt');
const { Model } = require('objection');
const knexfile = require('../knexfile')[process.env.NODE_ENV];


const knex = Knex(knexfile);
Model.knex(knex);

class User extends Model {
  constructor() {
    super();
    this.getPosts = this.getPosts.bind(this);
  }

  static get tableName() {
    return 'users';
  }

  static async createUser({ username, email, password }) {
    if (!username || !email || !password) {
      return null;
    }
    const hash = await bcrypt.hash(password, 10);
    const res = await this.query().allowInsert('[email, username, password]').insert({
      email,
      username,
      password: hash,
    });
    return res;
  }

  async getPosts({ id }) {
    const user = await this.query().findById(id);
    const posts = await user.$relatedQuery('posts');
    return posts;
  }

  static async authenticate({ email, password }) {
    const reqUser = await this.query().findOne({
      email,
    });
    // console.log(`in user.auth email: ${email} password: ${password}\n`);
    const match = await bcrypt.compare(password, reqUser.password);

    if (match) {
      return reqUser;
    }
    return null;
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.user_id',
        },
      },
    };
  }
}

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static createPost(user, { title, content }) {
    return user.$relatedQuery('posts').allowInsert('[title, content]').insert({
      title,
      content,
    });
  }

  static deletePost(user, { postid }) {
    console.log('sexy delete', postid);
    return user.$relatedQuery('posts').deleteById(postid);
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = {
  User,
  Post,
  knex,
};
