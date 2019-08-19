const uuid = require('uuid/v4');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const KnexStore = require('connect-session-knex')(session);
const LocalStrategy = require('passport-local').Strategy;
const apiroutes = require('./api');
const db = require('../models');

const store = new KnexStore({ knex: db.knex });

module.exports = (server, nextHandler) => {
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(session({
    genid: () => uuid(),
    store,
    secret: process.env.SECRET || 'awel1n2eip12yh3hrf8o1i3bf1',
    resave: false,
    saveUninitialized: true,
  }));

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await db.User.authenticate({ email, password });
      if (user) {
        return done(null, user);
      }
      return done(null, null);
    },
  ));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (userid, done) => {
    const user = await db.User.query().findById(userid);
    return done(null, user);
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.post('/login', async (req, res) => {
    passport.authenticate('local', (err, user) => {
      req.login(user, () => {
        console.log('currentuser:', user);
        if (user) {
          return res.send({ message: 'ok' });
        }
        res.status(401);
        return res.send({ message: 'Invalid username or password' });
      });
    })(req, res);
  });

  server.post('/signup', async (req, res) => {
    const { password, passwordConf } = req.body;
    if (password === passwordConf) {
      await db.User.createUser(req.body);
      passport.authenticate('local', (err, user) => {
        req.login(user, () => {
          console.log('redirecting \n');
          console.log(user);

          return res.send({ message: 'ok' });
        });
      })(req, res);
    }
  });

  server.get('/logout', (req, res) => {
    req.logOut();
    res.send({ message: 'ok' });
  });

  server.get('/createpost', async (req, res) => {
    const user = await db.User.query().findById(req.user.id);
    const { id } = await db.Post.createPost(user, { title: '', content: '' });
    res.redirect(`/post/${id}`);
  });

  server.use(apiroutes(db));

  server.get('/*', (req, res) => nextHandler(req, res));
};
